//
//  cameraView.swift
//  test
//
//  Created by Zachary Ebaugh on 11/7/21.
//

import SwiftUI
import AVFoundation


//struct SwiftUIView_Previews: PreviewProvider {
//    static var previews: some View {
//        cameraView()
//    }
//}


struct LiveCamera: View {
    
    var body: some View {
        
        cameraView()
    }
}

struct LiveCamera_Previews: PreviewProvider {
    static var previews: some View {
        LiveCamera()
    }
}




struct cameraView: View {
    
    @StateObject var camera = cameraModel()
    
    var body: some View {
        ZStack{
//                        cameraPreview(camera: camera).ignoresSafeArea()
            Color.black.ignoresSafeArea()
            VStack{
                
                if camera.isTaken{
                    Button(action: /*@START_MENU_TOKEN@*/{}/*@END_MENU_TOKEN@*/, label: {
                        Image(systemName: "arrow.triangle.2.circlepath.camera")
                            .foregroundColor(.black)
                            .padding()
                            .background(Color.white)
                            .clipShape(/*@START_MENU_TOKEN@*/Circle()/*@END_MENU_TOKEN@*/)
                    })
                    .padding(.trailing, 10)
                    Spacer()
                }
                
                
                Spacer()
                HStack{
                    
                    if camera.isTaken{
                        Button(action: /*@START_MENU_TOKEN@*/{}/*@END_MENU_TOKEN@*/, label: {
                            Text("Save")
                                .foregroundColor(.white)
                                .fontWeight(.semibold)
                        })
                        .padding(.leading)
                        Spacer()
                    }
                    
                    else{
                        
                        Button(action: camera.takePic, label: {
                            
                            ZStack{
                                Circle()
                                    .fill(Color.white)
                                    .frame(width: 80, height: 80)
                                Circle()
                                    .stroke(Color.white, lineWidth: 2)
                                    .frame(width: 85, height: 85)
                            }
                            
                        })
                        
                        
                        
                        
                    }
                }
            }
            .onAppear(perform: {
                camera.checkAuth()
            })
            
        }
    }
}

class cameraModel: NSObject,ObservableObject,AVCapturePhotoCaptureDelegate{
    @Published var isTaken = false
    
    @Published var session = AVCaptureSession()
    
    @Published var alert = false
    
    @Published var output = AVCapturePhotoOutput()
    
    @Published var preview = AVCaptureVideoPreviewLayer()
    
    func checkAuth(){
        
        // first checking camera got permission...
        switch AVCaptureDevice.authorizationStatus(for: .video) {
        case .authorized:
            setUp()
            return
        // Setting up session
        case .notDetermined:
            // return for permission
            AVCaptureDevice.requestAccess(for: .video) { (status) in
                
                if status {
                    self.setUp()
                }
            }
        case .denied:
            self.alert.toggle()
            return
            
        default:
            return
        }
    }
    
    func setUp() {
        
        // setting up camera
        do {
            // setting configuration
            self.session.beginConfiguration()
            
            // change for your own...
            let device = AVCaptureDevice.default(.builtInWideAngleCamera, for: .video, position: .front)
            
            let input = try AVCaptureDeviceInput(device: device!)
            
            // checking and adding to session
            if self.session.canAddInput(input) {
                self.session.addInput(input)
            }
            
            // same for output
            if self.session.canAddOutput(self.output) {
                self.session.addOutput(self.output)
            }
            
            self.session.commitConfiguration()
        }
        catch {
            print(error.localizedDescription)
        }
    }
    
    func takePic(){
        DispatchQueue.global(qos: .background).async {
            
            self.output.capturePhoto(with: AVCapturePhotoSettings(), delegate: self)
            self.session.stopRunning()
            
            DispatchQueue.main.async {
                withAnimation{self.isTaken.toggle()}
            }
        }
    }
    
    func photoOutput(_ output: AVCapturePhotoOutput, didFinishProcessingPhoto photo: AVCapturePhoto, error: Error?) {
        
        if error != nil{
            return
        }
        
        print("pic taken...")
    }
}


struct cameraPreview: UIViewRepresentable{
    
    @ObservedObject var camera: cameraModel
    
    func makeUIView(context: Context) -> UIView {
        let view = UIView(frame: UIScreen.main.bounds)
        
        camera.preview = AVCaptureVideoPreviewLayer(session: camera.session)
        camera.preview.frame = view.frame
        
        camera.preview.videoGravity = .resizeAspectFill
        view.layer.addSublayer(camera.preview)
        
        camera.session.startRunning()
        
        return view
    }
    
    func updateUIView(_ uiView: UIView, context: Context) {
        
    }
    
    
}





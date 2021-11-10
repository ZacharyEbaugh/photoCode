//
//  cameraView.swift
//  test
//
//  Created by Zachary Ebaugh on 11/7/21.
//

import SwiftUI
import AVFoundation

struct cameraView: View {
    var body: some View {
        ZStack{
            Color(.black).ignoresSafeArea(.all, edges: .all)
            
            VStack{
                Spacer()
                HStack{
                    
                    Button(action: /*@START_MENU_TOKEN@*/{}/*@END_MENU_TOKEN@*/, label: {
                        
                    })
                    
                    ZStack{
                        Circle()
                            .fill(Color.white)
                            .frame(width: 80, height: 80)
                        Circle()
                            .stroke(Color.white, lineWidth: 2)
                            .frame(width: 85, height: 85)
                    }
                   
                    
                }
                
                
                
            }
        }
    }
}

class cameraModel: ObservableObject{
    @Published var isTaken = false
    
    @Published var session = AVCaptureSession()
    
    @Published var alert = false
    
    func checkAuth(){
    
        switch AVCaptureDevice.authorizationStatus(for: .video) {
        case .authorized:
            setUp()
            return
        case .notDetermined:
            AVCaptureDevice.requestAccess(for: .video) { (status) in
                if status{
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
    
    func setUp(){
        
        
    }
}

struct SwiftUIView_Previews: PreviewProvider {
    static var previews: some View {
        cameraView()
       
        
    }
}

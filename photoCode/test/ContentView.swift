//
//  ContentView.swift
//  test
//
//  Created by Zachary Ebaugh on 11/7/21.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationView{
            ZStack{
                Color(.black).ignoresSafeArea()
                VStack{
                    Text("photocode").font(.system(size: 40, weight: .heavy, design: .default))
                        .foregroundColor(.white)
                        .padding()
                    Image(systemName: "circle.fill")
                    Spacer()
                    
                }
                VStack{
                    Spacer()
                    HStack{
                        NavigationLink(
                            destination: LiveCamera(),
                            label: {
                                Image(systemName: "camera.circle.fill")
                                    .resizable()
                                    .foregroundColor(.white)
                                    .aspectRatio(contentMode: .fit)
                                    .colorScheme(.dark)
                                    .frame(width: 100, height: 100)
                                    .padding(.trailing, 40)
                                    .padding(.bottom, 60)
                            })
                        NavigationLink(
                            destination: Text("Compiler"),
                            label: {
                                Image(systemName: "waveform.circle.fill")
                                    .resizable()
                                    .frame(width: 100, height: /*@START_MENU_TOKEN@*/100/*@END_MENU_TOKEN@*/, alignment: /*@START_MENU_TOKEN@*/.center/*@END_MENU_TOKEN@*/)
                                    .foregroundColor(.white)
                                    .aspectRatio(contentMode: .fit)
                                    .padding(.leading, 40)
                                    .padding(.bottom, 60)
                            })
                    }
                }
                
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}

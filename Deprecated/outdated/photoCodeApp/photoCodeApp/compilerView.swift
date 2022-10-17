//
//  compilerView.swift
//  photoCodeApp
//
//  Created by Zachary Ebaugh on 11/15/21.
//

import Foundation
import SwiftUI

//@available(iOS 15.0, *)
struct compilerView: View {
    
    @State var textFieldText: String = ""
    @State var isExpanded = false
    @State var language = 0
    
    @Binding var text: String
   
    
    var languageList: [String] = ["Java", "C++", "C", "C#"]
    
    var body: some View {
        ZStack(alignment: .topTrailing) {
            Color.gray
                .contrast(4)
                .ignoresSafeArea()
      
            VStack {
                
                DisclosureGroup(languageList[language], isExpanded: $isExpanded){
                    ForEach(0...3, id: \.self){ num in
                        Text(languageList[(num)])
                            .font(.title3)
                            .onTapGesture {
                                self.language = num
                                withAnimation{
                                    self.isExpanded.toggle()
                                }
                               
                            }
                    }
                    
                }.accentColor(.white)
                .font(.title2)
                .foregroundColor(.white)
                .padding(.all, 10)
                .background(Color.blue).colorScheme(.light)
                .cornerRadius(10)
                Spacer()
            }
            .padding(.top, 30)
            .padding(.trailing)
            .frame(width: 350, height: 20)
      
            
            VStack{
                TextView(text: $textFieldText)
                    .padding(.top, 100)
                    .frame(width: .infinity, height: .infinity, alignment: .top)
                    .keyboardType(.asciiCapable)
                    .autocapitalization(.none)
                    .disableAutocorrection(true)
                    .cornerRadius(20)
                    
                    Spacer()
                Button(action: /*@START_MENU_TOKEN@*/{}/*@END_MENU_TOKEN@*/, label: {
                    Text("COMPILE")
                        .foregroundColor(.white)
                        .font(.headline).fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
                        
                        .frame(width: 340, height: /*@START_MENU_TOKEN@*/100/*@END_MENU_TOKEN@*/, alignment: /*@START_MENU_TOKEN@*/.center/*@END_MENU_TOKEN@*/)
                        .background(Color.blue.cornerRadius(20))
                        
                })
            }
            Spacer()
        }
        
    }
    
}

struct compilerView_Previews: PreviewProvider {
    static var previews: some View {
        compilerView(text: .constant(""))
    }
}

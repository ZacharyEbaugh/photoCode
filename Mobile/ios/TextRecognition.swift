//
//  TextRecognition.swift
//  PhotoCode
//
//  Created by Brandon  Spangler on 8/11/22.
//

import Foundation
import Vision
import SwiftUI

import MLKit


@objc(TextRecognition)
class TextRecognition: NSObject {
    
  private var result: [String] = []
  private var imageText: String = "undefined"
  
  @objc
  func recognizeTextGoogle(_ iLink:String, callback:RCTResponseSenderBlock) {
    
    guard let uiimage = UIImage(named: iLink) else { return }
    
    let latinOptions = TextRecognizerOptions()
    lazy var textRecognizer = TextRecognizer.textRecognizer(options:latinOptions)
    
    let visionImage = VisionImage(image: uiimage)
    visionImage.orientation = uiimage.imageOrientation
    
    
    textRecognizer.process(visionImage) { result1, error in
      guard error == nil, let result1 = result1 else {
        // Error handling
        print("error")
        return
      }
      // Recognized text
      let resultText = result1.text
      self.processResult(resultText)
    }
    
    sleep(1)
    callback([imageText])
  }
  
  func processResult(_ result: String) {
      imageText = result
   }


  @objc
  func recognizeText(_ iLink:String, callback:RCTResponseSenderBlock) {
    let options = [kCGImageSourceShouldCache: false] as CFDictionary
//    let url = URL(fileURLWithPath: "/Users/brandonspangler/PhotoCode/ios/example1.png")
    let url = URL(fileURLWithPath: iLink)
    guard let source = CGImageSourceCreateWithURL(url as CFURL, options) else { return }
    let imageOptions = [kCGImageSourceCreateThumbnailFromImageAlways: true,
                                   kCGImageSourceCreateThumbnailWithTransform: true,
                                   kCGImageSourceShouldCacheImmediately: true ] as CFDictionary
    guard let image = CGImageSourceCreateImageAtIndex(source, 0, imageOptions) else { return }
    
        
        // Get the CGImage on which to perform requests.
//      guard let cgImage = UIImage(named: imageLink)?.cgImage else { return }
      
//        print("ERROR!!!")
      
        // Create a new image-request handler.
        let requestHandler = VNImageRequestHandler(cgImage: image)

        // Create a new request to recognize text.
      if #available(iOS 13.0, *) {
//        print("request Handled!")
        let request = VNRecognizeTextRequest(completionHandler: recognizeTextHandler)
        
        
        do {
            // Perform the text-recognition request.
            try requestHandler.perform([request])
            callback([result])
        } catch {
            print("Unable to perform the requests: \(error).")
        }
        
      } else {
        print("Please Update IOS Version")
      };
    }

    @objc
    private func recognizeTextHandler(request: VNRequest, error: Error?) {
      if #available(iOS 13.0, *) {
        guard let observations =
                request.results as? [VNRecognizedTextObservation] else {
          return
        }
        
        let recognizedStrings = observations.compactMap { observation in
            // Return the string of the top VNRecognizedText instance.
            return observation.topCandidates(1).first?.string
        }
        
        // Process the recognized strings.
        result = recognizedStrings
      } else {
        print("Please Update IOS Version")
      }
       
    }
    
    @objc
  func getText(_ callback:RCTResponseSenderBlock) -> [String] {
//        print("working?!")
        callback(result)
        return result
    }
    
    @objc
    static func requiresMainQueueSetup() ->Bool{
      return true;
    }
    
}

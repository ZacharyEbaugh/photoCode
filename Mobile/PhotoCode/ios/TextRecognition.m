//
//  TextRecognition.m
//  PhotoCode
//
//  Created by Brandon  Spangler on 8/11/22.
//

#import <Foundation/Foundation.h>

#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(TextRecognition, NSObject)

RCT_EXTERN_METHOD(recognizeText:
                  (NSString *)iLink
                  callback:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(recognizeTextGoogle:
                  (NSString *)iLink
                  callback:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(recognizeTextHandler)

RCT_EXTERN_METHOD(getText:
                  (RCTResponseSenderBlock)callback)

@end

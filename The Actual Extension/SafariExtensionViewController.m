//
//  SafariExtensionViewController.m
//  The Actual Extension
//
//  Created by Steven Frank on 1/5/18.
//  Copyright © 2018 Steven Frank. All rights reserved.
//

#import "SafariExtensionViewController.h"

@interface SafariExtensionViewController ()

@end

@implementation SafariExtensionViewController

+ (SafariExtensionViewController *)sharedController {
	static SafariExtensionViewController *sharedController = nil;
	static dispatch_once_t onceToken;
	dispatch_once(&onceToken, ^{
		sharedController = [[SafariExtensionViewController alloc] init];
	});
	return sharedController;
}

@end

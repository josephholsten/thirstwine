// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

if(typeof sIFR == "function" && !sIFR.UA.bIsIEMac){
  sIFR.setup();
  // sIFR.debug();
	
  sIFR.replaceElement("#header li a", named({sFlashSrc: "/karabine.swf", sColor: "#f6f6f6", sBgColor: "#000000", sCase: "lower"}));
};
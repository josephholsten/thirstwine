IMpreload('wines_files', 'shapeimage_1', '0');
IMpreload('wines_files', 'shapeimage_1', '1');
IMpreload('wines_files', 'shapeimage_1', '2');
IMpreload('wines_files', 'shapeimage_1', '3');
IMpreload('wines_files', 'shapeimage_1', '4');
IMpreload('wines_files', 'shapeimage_1', '5');
IMpreload('wines_files', 'shapeimage_1', '6');
IMpreload('wines_files', 'shapeimage_1', '7');
IMpreload('wines_files', 'shapeimage_1', '8');
IMpreload('wines_files', 'shapeimage_1', '9');
IMpreload('wines_files', 'shapeimage_1', '10');
IMpreload('wines_files', 'shapeimage_1', '11');
IMpreload('wines_files', 'shapeimage_3', '0');
IMpreload('wines_files', 'shapeimage_3', '1');
IMpreload('wines_files', 'shapeimage_3', '2');
IMpreload('wines_files', 'shapeimage_3', '3');
IMpreload('wines_files', 'shapeimage_3', '4');
IMpreload('wines_files', 'shapeimage_3', '5');
IMpreload('wines_files', 'shapeimage_3', '6');
IMpreload('wines_files', 'shapeimage_3', '7');
IMpreload('wines_files', 'shapeimage_3', '8');
IMpreload('wines_files', 'shapeimage_3', '9');
IMpreload('wines_files', 'shapeimage_3', '10');
IMpreload('wines_files', 'shapeimage_3', '11');
IMpreload('wines_files', 'shapeimage_3', '12');
IMpreload('wines_files', 'shapeimage_3', '13');
IMpreload('wines_files', 'shapeimage_3', '14');
IMpreload('wines_files', 'shapeimage_3', '15');
IMpreload('wines_files', 'shapeimage_3', '16');
IMpreload('wines_files', 'shapeimage_3', '17');
IMpreload('wines_files', 'shapeimage_3', '18');
IMpreload('wines_files', 'shapeimage_6', '0');
IMpreload('wines_files', 'shapeimage_6', '1');
IMpreload('wines_files', 'shapeimage_6', '2');
IMpreload('wines_files', 'shapeimage_6', '3');
IMpreload('wines_files', 'shapeimage_6', '4');
IMpreload('wines_files', 'shapeimage_6', '5');
IMpreload('wines_files', 'shapeimage_6', '6');
IMpreload('wines_files', 'shapeimage_6', '7');
IMpreload('wines_files', 'shapeimage_6', '8');
IMpreload('wines_files', 'shapeimage_6', '9');
IMpreload('wines_files', 'shapeimage_6', '10');
IMpreload('wines_files', 'shapeimage_6', '11');
IMpreload('wines_files', 'shapeimage_6', '12');
IMpreload('wines_files', 'shapeimage_6', '13');
IMpreload('wines_files', 'shapeimage_6', '14');
IMpreload('wines_files', 'shapeimage_6', '15');
IMpreload('wines_files', 'shapeimage_6', '16');
IMpreload('wines_files', 'shapeimage_6', '17');
IMpreload('wines_files', 'shapeimage_6', '18');
IMpreload('wines_files', 'shapeimage_6', '19');
IMpreload('wines_files', 'shapeimage_6', '20');
var MINIMUM_FONT = "10";
var UNITS = "";

function elementFontSize(element)
{
    var fontSize = MINIMUM_FONT; 

    if (document.defaultView)
    {
        var computedStyle = document.defaultView.getComputedStyle(element, null);
        if (computedStyle)
        {
            fontSize = computedStyle.getPropertyValue("font-size");
        }
    }
    else if (element.currentStyle)
    {
        fontSize = element.currentStyle.fontSize;
    }

    if ((UNITS.length == 0) && (fontSize != MINIMUM_FONT))
    {
        UNITS = fontSize.substring(fontSize.length - 2, fontSize.length)
    }

    return parseFloat(fontSize);
}

function adjustFontSizeIfTooBig(idOfElement)
{
    var oTextBoxOuterDiv;
    var oTextBoxMiddleDiv;
    var oTextBoxInnerDiv;
    var oTextBoxOuterDiv = document.getElementById(idOfElement);
    
    if (oTextBoxOuterDiv)
    {
        oTextBoxMiddleDiv = getChildOfType(oTextBoxOuterDiv, "DIV", 0);
        if (oTextBoxMiddleDiv)
        {
            oTextBoxInnerDiv = getChildOfType(oTextBoxMiddleDiv, "DIV", 0);
            if (oTextBoxInnerDiv)
            {
                var offsetHeight = oTextBoxInnerDiv.offsetHeight;
                var specifiedHeight = offsetHeight;
                if (oTextBoxMiddleDiv.style.height != "")
                {
                    specifiedHeight = parseFloat(oTextBoxMiddleDiv.style.height);
                }
                else if (oTextBoxOuterDiv.style.height != "")
                {
                    specifiedHeight = parseFloat(oTextBoxOuterDiv.style.height);
                }
                if (offsetHeight > specifiedHeight)
                {
                    var smallestFontSize = 200;
                    
                    var aParaChildren = getParaDescendants(oTextBoxInnerDiv);
                    var oneLine = false;
                    for (i = 0; i < aParaChildren.length; i++)
                    {
                        var oParagraphDiv = aParaChildren[i];
                        var lineHeight = elementLineHeight(oParagraphDiv);
                        oneLine = oneLine || (lineHeight * 1.5 >= specifiedHeight);
                        if (oParagraphDiv.nodeName == "DIV")
                        {
                            var fontSize = elementFontSize(oParagraphDiv);
                            smallestFontSize = Math.min( smallestFontSize, fontSize );
                            for (j = 0; j < oParagraphDiv.childNodes.length; j++)
                            {
                                var oSpan = oParagraphDiv.childNodes[j];
                                if ((oSpan.nodeName == "SPAN") || (oSpan.nodeName == "A"))
                                {
                                    fontSize = elementFontSize(oSpan);
                                    smallestFontSize = Math.min( smallestFontSize, fontSize );
                                }
                            }
                        }
                    }
                    var minimum = parseFloat(MINIMUM_FONT);
                    
                    var count = 0
                    while ((smallestFontSize > minimum) && (offsetHeight > specifiedHeight) && (count < 10))
                    {
                        ++ count;
                        if (oneLine)
                        {
                            var oldWidth = parseInt(oTextBoxOuterDiv.style.width);
                            oTextBoxInnerDiv.style.width =
                                "" + oldWidth * Math.pow(1.05, count) + "px";
                        }
                        else
                        {
                            var scale = Math.max(0.95, minimum / smallestFontSize);
                            
                            for (i = 0; i < aParaChildren.length; i++)
                            {
                                var oParagraphDiv = aParaChildren[i];
                                if (oParagraphDiv.nodeName == "DIV")
                                {
                                    var paraFontSize = elementFontSize(oParagraphDiv) * scale;
                                    var paraLineHeight = elementLineHeight(oParagraphDiv) * scale;
                                    for (j = 0; j < oParagraphDiv.childNodes.length; j++)
                                    {
                                        var oSpan = oParagraphDiv.childNodes[j];
                                        if ((oSpan.nodeName == "SPAN") || (oSpan.nodeName == "A"))
                                        {
                                            var spanFontSize = elementFontSize(oSpan) * scale;
                                            var spanLineHeight = elementLineHeight(oSpan) * scale;
                                            oSpan.style.fontSize = spanFontSize + UNITS;
                                            oSpan.style.lineHeight = spanLineHeight + UNITS;
                                            smallestFontSize = Math.min( smallestFontSize, spanFontSize );
                                        }
                                    }
                                    oParagraphDiv.style.fontSize = paraFontSize + UNITS;
                                    oParagraphDiv.style.lineHeight = paraLineHeight + UNITS;
                                    smallestFontSize = Math.min( smallestFontSize, paraFontSize );
                                }
                            }
                        }
                        
                        offsetHeight = oTextBoxInnerDiv.offsetHeight;
                    }
                }
            }
        }
    }
}


function elementLineHeight(element)
{
    var lineHeight = MINIMUM_FONT; 
    
    if (document.defaultView)
    {
        var computedStyle = document.defaultView.getComputedStyle(element, null);
        if (computedStyle)
        {
            lineHeight = computedStyle.getPropertyValue("line-height");
        }
    }
    else if (element.currentStyle)
    {
        lineHeight = element.currentStyle.lineHeight;
    }
    
    if ((UNITS.length == 0) && (lineHeight != MINIMUM_FONT))
    {
        UNITS = lineHeight.substring(lineHeight.length - 2, lineHeight.length)
    }
    
    return parseFloat(lineHeight);
}

function adjustLineHeightIfTooBig(idOfElement)
{
    var oTextBoxOuterDiv;
    var oTextBoxMiddleDiv;
    var oTextBoxInnerDiv;
    var oTextBoxOuterDiv = document.getElementById(idOfElement);
    
    if (oTextBoxOuterDiv)
    {
        oTextBoxMiddleDiv = getChildOfType(oTextBoxOuterDiv, "DIV", 0);
        if (oTextBoxMiddleDiv)
        {
            oTextBoxInnerDiv = getChildOfType(oTextBoxMiddleDiv, "DIV", 0);
            if (oTextBoxInnerDiv)
            {
                var offsetHeight = oTextBoxInnerDiv.offsetHeight;
                var specifiedHeight = offsetHeight;
                if (oTextBoxMiddleDiv.style.height != "")
                {
                    specifiedHeight = parseFloat(oTextBoxMiddleDiv.style.height);
                }
                else if (oTextBoxOuterDiv.style.height != "")
                {
                    specifiedHeight = parseFloat(oTextBoxOuterDiv.style.height);
                }
                if (offsetHeight > specifiedHeight)
                {
                    var adjusted = true;
                    var count = 0;
                    while ((adjusted) && (offsetHeight > specifiedHeight) && (count < 10))
                    {
                        adjusted = false;
                        ++ count;
                        
                        var aParaChildren = getParaDescendants(oTextBoxInnerDiv);
                        for (i = 0; i < aParaChildren.length; i++)
                        {
                            var oParagraphDiv = aParaChildren[i];
                            if (oParagraphDiv.nodeName == "DIV")
                            {
                                var fontSize = elementFontSize(oParagraphDiv);
                                var lineHeight = elementLineHeight(oParagraphDiv) * 0.95;
                                if (lineHeight >= (fontSize * 1.1))
                                {
                                    oParagraphDiv.style.lineHeight = lineHeight + UNITS;
                                    adjusted = true;
                                }
                                
                                
                                
                                for (j = 0; j < oParagraphDiv.childNodes.length; j++)
                                {
                                    var oSpan = oParagraphDiv.childNodes[j];
                                    if ((oSpan.nodeName == "SPAN") || (oSpan.nodeName == "A"))
                                    {
                                        var fontSize = elementFontSize(oSpan);
                                        var lineHeight = elementLineHeight(oSpan) * 0.95;
                                        if (lineHeight >= (fontSize * 1.1))
                                        {
                                            oSpan.style.lineHeight = lineHeight + UNITS;
                                            var adjusted = true;
                                        }
                                    }
                                }
                            }
                        }
                        
                        offsetHeight = oTextBoxInnerDiv.offsetHeight;
                    }
                }
            }
        }
    }
}

var smallTransparentGif = "";
function fixupIEPNG(strImageID, transparentGif) 
{
    smallTransparentGif = transparentGif;
    if (windowsInternetExplorer && (browserVersion < 7))
    {
        var img = document.getElementById(strImageID);
        if (img)
        {
            var src = img.src;
            img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "', sizingMethod='scale')";
            img.src = transparentGif;
            img.attachEvent("onpropertychange", imgPropertyChanged);
        }
    }
}

function getChildOfType(oParent, sNodeName, requestedIndex)
{
    var childrenOfType = oParent.getElementsByTagName(sNodeName);
    return (requestedIndex < childrenOfType.length) ?
           childrenOfType.item(requestedIndex) : null;
}

function onPageLoad()
{
    detectBrowser();
    adjustLineHeightIfTooBig("id1");
    adjustFontSizeIfTooBig("id1");
    adjustLineHeightIfTooBig("id2");
    adjustFontSizeIfTooBig("id2");
    adjustLineHeightIfTooBig("id3");
    adjustFontSizeIfTooBig("id3");
    adjustLineHeightIfTooBig("id5");
    adjustFontSizeIfTooBig("id5");
    fixupIEPNG("shapeimage_1_link_0", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_1_link_1", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_1_link_2", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_1_link_3", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_1_link_4", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_1_link_5", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_1_link_6", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_1_link_7", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_1_link_8", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_1_link_9", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_1_link_10", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_1_link_11", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_1", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_3_link_0", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_3_link_1", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_3_link_2", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_3_link_3", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_3_link_4", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_3_link_5", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_3_link_6", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_3_link_7", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_3_link_8", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_3_link_9", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_3_link_10", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_3_link_11", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_3_link_12", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_3_link_13", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_3_link_14", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_3_link_15", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_3_link_16", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_3_link_17", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_3_link_18", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_3", "wines_files/transparent.gif");
    fixupIEPNG("id4", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_6_link_0", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_6_link_1", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_6_link_2", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_6_link_3", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_6_link_4", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_6_link_5", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_6_link_6", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_6_link_7", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_6_link_8", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_6_link_9", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_6_link_10", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_6_link_11", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_6_link_12", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_6_link_13", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_6_link_14", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_6_link_15", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_6_link_16", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_6_link_17", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_6_link_18", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_6_link_19", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_6_link_20", "wines_files/transparent.gif");
    fixupIEPNG("shapeimage_6", "wines_files/transparent.gif");
    fixupIEPNG("id6", "wines_files/transparent.gif");
    fixupIEPNG("id7", "wines_files/transparent.gif");
    fixupIEPNG("id8", "wines_files/transparent.gif");
    fixupIEPNG("id9", "wines_files/transparent.gif");
    fixupIEPNG("id10", "wines_files/transparent.gif");
    fixupIEPNG("id11", "wines_files/transparent.gif");
    fixupIEPNG("id12", "wines_files/transparent.gif");
    return true;
}

function getParaDescendants(oAncestor)
{
    var oParaDescendants = new Array();
    var oPotentialParagraphs = oAncestor.getElementsByTagName('DIV');
    for (var iIndex=0; iIndex<oPotentialParagraphs.length; iIndex++)
    {
        var oNode = oPotentialParagraphs.item(iIndex);
        if (oNode.className.lastIndexOf('paragraph') != -1)
        {
            oParaDescendants.push(oNode);
        }
    }
    return oParaDescendants;
}

function IMpreload(path, name, areaIndex)
{
    var rolloverName = name+'_rollover_'+areaIndex;
    var rolloverPath = path+'/'+rolloverName+'.png';
    self[rolloverName] = new Image();
    self[rolloverName].src = rolloverPath;

    var linkName = name+'_link_'+areaIndex;
    var linkPath = path+'/'+linkName+'.png';
    self[linkName] = new Image();
    self[linkName].src = linkPath;
    return true;
}

function IMmouseover(name, areaIndex)
{
    var rolloverName = name+'_rollover_'+areaIndex;
    var linkName = name+'_link_'+areaIndex;
    var img  = document.getElementById(linkName);
    if (img)
    {
        img.src = self[rolloverName].src;
    }
    return true;
}

function IMmouseout(name, areaIndex)
{
    var linkName = name+'_link_'+areaIndex;
    var img  = document.getElementById(linkName);
    if (img)
    {
        img.src = self[linkName].src;
    }
    return true;
}

var windowsInternetExplorer = false;
var browserVersion = 0;
function detectBrowser()
{
    windowsInternetExplorer = false;
    var appVersion = navigator.appVersion;
    if ((appVersion.indexOf("MSIE") != -1) &&
        (appVersion.indexOf("Macintosh") == -1))
    {
        var temp = appVersion.split("MSIE");
        browserVersion = parseFloat(temp[1]);
        windowsInternetExplorer = true;
    }
}

var inImgPropertyChanged = false;
function imgPropertyChanged()
{
    if ((window.event.propertyName == "src") && (! inImgPropertyChanged))
    {
        inImgPropertyChanged = true;
        var el = window.event.srcElement;
        if (el.src != smallTransparentGif)
        {
            el.filters.item(0).src = el.src;
            el.src = smallTransparentGif;
        }
        inImgPropertyChanged = false;
    }
}


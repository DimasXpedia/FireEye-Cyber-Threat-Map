/*!
 * careerfeeds functions
 * Version: 1.0
 */
;
var feedcontainerSr=$("#jobsContent");
var feedurlSr=$("#srURL").val();
var levelsFeedSr=$("#srLevel").val();
var typeofEmp=$("#srTypeOf").val();
var jobDescriptinUrlSr=$("#jobDescrptionUrl").val();
var content=[];
var jobFunctionsArray=[];
function displayFeedSR(m){if(m.length>=1){var v="";
var u="";
m=m.sort(function(y,x){var s=y.name;
var j=x.name;
s+=y.location.city;
j+=x.location.city;
s+=y.location.region;
j+=x.location.region;
return((s.toUpperCase()>j.toUpperCase())?1:(s.toUpperCase()<j.toUpperCase())?-1:0)
});
for(var g=0;
g<jobFunctionsArray.length;
g++){var d=jobFunctionsArray[g];
for(var r=0;
r<m.length;
r++){var a="";
for(var o=0;
o<m[r].customField.length;
o++){var n=m[r].customField[o]["fieldId"];
var c=m[r].customField[o]["fieldLabel"];
if(n==="5b20119b6d8bc50530ca37db"||c==="External Job Category"){a=m[r].customField[o]["valueLabel"]
}}if(!m[r].hidden&&d===a){var p=m[r].location.city;
var e=m[r].location.region;
var b=m[r].location.country;
var t=p;
var f="";
for(var q=0;
q<m[r].customField.length;
q++){var k=m[r].customField[q]["fieldId"];
if(k==="COUNTRY"){f=m[r].customField[q]["valueLabel"]
}}if(b.toUpperCase()==="US"){t=t+", "+e+", "+f
}else{t=t+", "+f
}var w=m[r].name;
var h=jobDescriptinUrlSr+"/"+m[r].id;
var l="";
if(a!==v){v=a;
l=String("</ul><h4>"+v+'</h4><ul><li class="jobs"><a href="'+h+'" target="_blank">'+w+'</a><span class="location-career">'+t+"</span></li>")
}else{l=String('<li class="jobs"><a href="'+h+'" target="_blank">'+w+'</a><span class="location-career">'+t+"</span></li>")
}u+=l
}}}if(u===""){$(".noresults").show()
}else{$(".noresults").hide()
}feedcontainerSr.html(u)
}else{alert("Error occurred. Please make sure you select correct Social Channel category and entered correct URL.")
}}function filterResultsSR(){for(var y=0;
y<content.length;
y++){content[y].hidden=false
}var q=$("#gnewtonKeyword").val();
var g=$("#gnewtonLocation").val();
var w=$("#gnewtonFunctionsList").val();
var B=$("#gnewtonLevelExpList").val();
var b=$("#gnewtonEmpTypeList").val();
var o=[];
for(var C=0;
C<content.length;
C++){var z=content[C].location.city;
var e=content[C].location.region;
var p=content[C].location.postalCode;
if(undefined==p){p=""
}var c=content[C].location.country;
var m="";
for(var y=0;
y<content[C].customField.length;
y++){var n=content[C].customField[y]["fieldId"];
if(n==="COUNTRY"){m=content[C].customField[y]["valueLabel"]
}}var h=content[C].hidden;
var E=new RegExp(g,"i");
var l=E.test(e);
var D=E.test(p);
var x=E.test(z);
var r=E.test(c);
var k=E.test(m);
if(!h){if(g!==""&&!(l||D||x||r||k)){content[C].hidden=true
}}}for(var C=0;
C<content.length;
C++){var d=content[C].name;
var F=content[C].company.name;
var z=content[C].location.city;
var e=content[C].location.region;
var p=content[C].location.postalCode;
if(undefined==p){p=""
}var h=content[C].hidden;
var E=new RegExp(q,"i");
var u=E.test(d);
var A=E.test(F);
var l=E.test(e);
var D=E.test(p);
var x=E.test(z);
if(!h){if(q!==""&&!(u||A||l||D||x)){content[C].hidden=true
}}}for(var C=0;
C<content.length;
C++){var f="";
for(var y=0;
y<content[C].customField.length;
y++){var s=content[C].customField[y]["fieldId"];
var a=content[C].customField[y]["fieldLabel"];
if(s==="5b20119b6d8bc50530ca37db"||a==="External Job Category"){f=content[C].customField[y]["valueLabel"]
}}var h=content[C].hidden;
if(!h){if(w!=="Select Job Function"&&f!==w){content[C].hidden=true
}}}for(var C=0;
C<content.length;
C++){var v=content[C].experienceLevel.label;
var h=content[C].hidden;
if(!h){if(B!=="Select Level of Experience"&&v!==B){content[C].hidden=true
}}}for(var C=0;
C<content.length;
C++){var t=content[C].typeOfEmployment.label;
var h=content[C].hidden;
if(!h){if(b!="Select Employment Type"&&t!==b){content[C].hidden=true
}}}displayFeedSR(content)
}function getPostings(){$(".loader").show();
var o=0;
var u=feedurlSr+"?limit=1";
$.ajax({type:"GET",url:u,async:false,success:function(j){o=j.totalFound
}});
o=Math.ceil(o/100);
var r=0;
var g=feedurlSr+"?limit=100&offset=";
for(var t=0;
t<o;
t++){var d=g+r;
$.ajax({type:"GET",url:d,async:false,success:function(j){r=r+100;
content=content.concat(j.content)
}}).fail(function(){$(".ajaxError").show()
}).always(function(){$(".loader").hide()
})
}var e=[];
var x=[];
if(content!=undefined&&content.length>0){var q="<option>Select Job Function</option>";
for(var t=0;
t<content.length;
t++){var a="";
for(var s=0;
s<content[t].customField.length;
s++){var k=content[t].customField[s]["fieldId"];
var c=content[t].customField[s]["fieldLabel"];
if(k==="5b20119b6d8bc50530ca37db"||c==="External Job Category"){a=content[t].customField[s]["valueLabel"];
if(a!=""){e.push(a)
}}}}for(var p=0;
p<e.length;
p++){var w=e[p];
var b=false;
for(var l=0;
l<x.length;
l++){var f=x[l];
if(w===f){b=true
}}if(!b){x.push(w)
}}x=x.sort(function(m,j){return((m>j)?1:(m<j)?-1:0)
});
jobFunctionsArray=x;
for(var h=0;
h<x.length;
h++){q+="<option>"+x[h]+"</option>"
}$("#gnewtonFunctionsList").html(q)
}if(content.length>0){$(".noresults").hide();
displayFeedSR(content)
}else{$(".noresults").show()
}}function populateDropDowns(){var b=$.ajax(levelsFeedSr).done(function(e){var d="<option>Select Level of Experience</option>";
for(var c=0;
c<e.content.length;
c++){d+="<option>"+e.content[c].label+"</option>"
}$("#gnewtonLevelExpList").html(d)
}).fail(function(){console.log("Error while callign SR Levels rest api")
});
var a=$.ajax(typeofEmp).done(function(g){var f="<option>Select Employment Type</option>";
var d=[];
for(var e=0;
e<g.content.length;
e++){d.push(g.content[e].label)
}d=d.sort(function(j,h){return((j>h)?1:(j<h)?-1:0)
});
for(var c=0;
c<d.length;
c++){f+="<option>"+d[c]+"</option>"
}$("#gnewtonEmpTypeList").html(f)
}).fail(function(){console.log("Error while callign SR Employment Type rest api")
})
}$(document).ready(function(){var a=$(".careersfeed_sr").html();
if(undefined!=a){getPostings();
populateDropDowns()
}});
/*!
 * General JavaScript Functions
 * Version: 1.6
*/
;
var fdc=fdc||{};
$.fn.equalHeight=function(){var a=0;
return this.each(function(b,c){var d=$(c).outerHeight();
a=Math.max(a,d)
}).outerHeight(a)
};
fdc.util=fdc.util||{};
fdc.util.getQueryParameter=function(b){var e=window.location.search.substring(1),c=e.split("&");
for(var a=0;
a<c.length;
a++){var d=c[a].split("=");
if(d[0]==b){return d[1]
}}return false
};
fdc.util.ellipsizeText=function(a){var c=parseInt(a.css("max-height")),b=a.data("trimmed")||"",d=a.text().replace("...","").split(" ").concat(b.split(" "));
a.text(d.join(" "));
b="";
if(c>0){a.css("max-height","none");
while(a.innerHeight()>c){b=d.pop().replace("...","")+" "+b;
a.text(d.join(" ")+"...")
}a.css("max-height",c);
a.data("trimmed",b.trim())
}};
fdc.util.isColumnStacked=function(b){var a=b.prop("class");
return((a.indexOf("s_g-u-1")>0&&window.outerWidth<320)||(a.indexOf("sm_g-u-1")>0&&window.outerWidth<480)||(a.indexOf("m_g-u-1")>0&&window.outerWidth<560)||(a.indexOf("ml_g-u-1")>0&&window.outerWidth<768)||(a.indexOf("l_g-u-1")>0&&window.outerWidth<960))
};
fdc.util.resizeGridTextures=function(){var a,c,b;
if(window.outerWidth<1200){$(".texture").each(function(){a="";
if($(this).hasClass("center")){a="translateY(-50%) "
}$(this).find("img").css("transform",a+"scale("+(window.outerWidth/1200)+")");
c="left";
if($(this).hasClass("right")){c="right"
}b=$(this).find("img");
b.css(c,(-1*(window.outerWidth/2))+"px")
})
}else{$(".texture").each(function(){a="";
if($(this).hasClass("center")){$(this).find("img").css("transform","translateY(-50%)")
}c="left";
if($(this).hasClass("right")){c="right"
}$(this).find("img").css(c,"-600px")
})
}};
$(document).ready(function(){$(".l_container.vertically-center").each(function(){var c=$(this).find(".g > div");
if(!fdc.util.isColumnStacked(c)){c.removeClass("stacked");
c.equalHeight()
}else{c.addClass("stacked")
}$(window).on("resize load",function(d){c.css("height","auto");
if(!fdc.util.isColumnStacked(c)){c.removeClass("stacked");
c.equalHeight()
}else{c.addClass("stacked")
}})
});
if($("body[data-redesign='redesign-2019']").length>0){var b=".uc-he01v2 .uc-he01_sc_s";
$(b).height("auto").equalHeight();
fdc.util.resizeGridTextures();
$(window).on("resize load",function(c){fdc.util.resizeGridTextures();
if(window.outerWidth<864){$(b).height("auto").equalHeight()
}else{$(b).height("100%")
}})
}if((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))){$("body").css("cursor","pointer")
}else{if($(".careersfeed_sr").length>0){$("#gnewtonFunctionsList").attr("style","width:auto !important")
}}if((/Android/.test(navigator.userAgent))){if($(".careersfeed_sr").length>0){$("#gnewtonKeyword").attr("style","border: 0.02em solid !important;");
$("#gnewtonLocation").attr("style","border: 0.02em solid !important;")
}}if((/iPad/.test(navigator.userAgent))){$(".gnewtonComboSearch").css("padding-right","2em");
if($(".careersfeed_sr").length>0){var a=$(".c17-6A823A").attr("height");
a="height:"+a+"px !important;";
if(window.matchMedia("(orientation: portrait)").matches){$(".c17-2E5799").attr("style",a);
$(".c17-B2282D").attr("style",a)
}if(window.matchMedia("(orientation: landscape)").matches){$(".c17-2E5799").attr("style",a);
$(".c17-B2282D").attr("style",a)
}}}$(window).resize(function(){if((/iPad/.test(navigator.userAgent))){if($(".careersfeed_sr").length>0){var c=$(".c17-6A823A").height();
c="height:"+c+"px !important";
if(window.matchMedia("(orientation: portrait)").matches){$(".c17-2E5799").attr("style",c);
$(".c17-B2282D").attr("style",c)
}if(window.matchMedia("(orientation: landscape)").matches){$(".c17-2E5799").attr("style",c);
$(".c17-B2282D").attr("style",c)
}}}})
});
function replaceQueryParam(o,n,d){var b=false;
var h=true;
var k=false;
var e;
var m=o.split("?");
if((m[1]=="")||(typeof m[1]=="undefined")){b=true;
h=false
}else{var l=m[1].split("&");
for(var g=0;
g<l.length;
g++){var f=l[g].split("=");
var j=f[0].toLowerCase();
if(j==n){l[g]=f[0]+"="+d;
k=true;
h=false
}}}if(k||h||b){if(h||b){var a="?";
if(h){a="&"
}e=o+a+n+"="+d
}else{e=m[0]+"?";
for(var c=0;
c<l.length;
c++){e+=l[c];
if(c<l.length-1){e+="&"
}}}return e
}else{return(false)
}}readCookie=function(f){var c=document.cookie;
var d=c.split(";");
for(var b=0;
b<d.length;
b++){var a=d[b].split("=")[0];
var e=d[b].split("=")[1];
if(a.trim()===f){return e
}}return""
};
function addMissingUTMsFromCookies(e){var c=["utm_source","utm_medium","utm_campaign","utm_content"],b=e;
for(var d=0;
d<c.length;
d++){if(b.indexOf(c[d])<0){var a=readCookie(c[d]);
if(""!=a){b=replaceQueryParam(b,c[d],a)
}}}return b
}jQuery(document).ready(function(){function d(n,j){var m="";
console.log("UTM param :: "+n+" Cookie value :: "+j);
if(n==="utm_source"){m=$("input[name='GoogleSource']").val();
if(m!=undefined&&m==="NULL"){$("input[name='GoogleSource']").val(j)
}}else{if(n==="utm_campaign"){m=$("input[name='GoogleCampaign']").val();
if(m!=undefined&&m==="NULL"){$("input[name='GoogleCampaign']").val(j)
}}else{if(n==="utm_medium"){m=$("input[name='GoogleMedium']").val();
if(m!=undefined&&m==="NULL"){$("input[name='GoogleMedium']").val(j)
}}else{if(n==="utm_content"){m=$("input[name='googleContent']").val();
if(m!=undefined&&m==="NULL"){$("input[name='googleContent']").val(j)
}}}}}}var a=window.location.search.substring(1);
if(a){var l=["cid","utm_source","utm_medium","utm_campaign","utm_content"];
var g=[];
for(var c=0;
c<l.length;
c++){g[c]=""
}var k=a.split("&");
for(var h=0;
h<k.length;
h++){var f=k[h].split("=");
f[0]=f[0].toLowerCase();
for(var e=0;
e<l.length;
e++){if(f[0]==l[e]){g[e]=f[1];
var b=f[0]+"="+f[1]+"; path=/";
document.cookie=b
}}}jQuery(".passUTM a,.passCID a").each(function(){var n=jQuery(this).attr("href");
for(var j=0;
j<l.length;
j++){if(g[j]){n=replaceQueryParam(n,l[j],g[j])
}}if(n){jQuery(this).attr("href",n)
}})
}setTimeout(function(){var m=["utm_source","utm_medium","utm_campaign","utm_content"];
for(var n=0;
n<m.length;
n++){var j=readCookie(m[n]);
console.log("cookie value "+j);
if(""!=j){d(m[n],j)
}}},6000)
});
/*!
 * a02 Search Filter
 * Version: 1.0
 */
;
jQuery(".a02_item:not(.a02_item-toggle)").click(function(b){b.preventDefault();
jQuery(".a02_item").removeClass("is-active");
jQuery(".a02_item:first-child").addClass("is-active");
jQuery(this).siblings().removeClass("is-active");
jQuery(this).addClass("is-active")
});
jQuery(".a02_title").click(function(){jQuery(this).toggleClass("is-toggled");
jQuery(this).parent().find(".a02_submenu").toggleClass("is-visible")
});
jQuery(".a02_item-toggle").click(function(b){b.preventDefault();
jQuery(this).children(".a02_item-toggle-link").toggleClass("is-visible");
jQuery(this).siblings(".a02_item-more").toggleClass("is-visible")
});
/*!
 * a09 Filter v2 Component
 * Version: 2.2
 */
;
fdc.a09=fdc.a09||{};
fdc.a09.categoryClickHandler=function(){var e=$(this);
var d=e.index()-1;
var f=e.closest(".a09").find(".options");
if(!e.hasClass("active")){e.closest(".a09").find(".group-name").removeClass("active");
f.filter(":visible").animate({height:"toggle"})
}f.eq(d).animate({height:"toggle"}).find("[data-behavior='filter']").click();
e.toggleClass("active")
};
fdc.a09.filterClickHandler=function(l,h){var o=$(l.target);
var j=o.closest(".a09").find(".option input[type=checkbox]");
var m=o.closest(".options").find(".option input[type=checkbox]");
var k=m.filter(":checked").length;
var n=0;
if(k!==0&&!h){j.each(function(){$("."+$(this).attr("id")).hide()
})
}if(k===0&&!h){j.each(function(){$("."+$(this).attr("id")).show()
})
}else{m.each(function(){if($(this).prop("checked")===true){n+=$("."+$(this).attr("id")).show().length
}})
}return n
};
fdc.a09.resetClickHandler=function(f){var d=$(this);
var e=d.closest(".a09").find(".option input").prop("checked",false);
fdc.a09.filterClickHandler(f)
};
$(document).ready(function(){jQuery(".a09 [data-behavior='show-category']").click(fdc.a09.categoryClickHandler);
var h=jQuery(".a09 [data-behavior='filter']").click(fdc.a09.filterClickHandler);
jQuery(".a09 [data-behavior='reset']").click(fdc.a09.resetClickHandler);
var m=fdc.util.getQueryParameter("filter");
if(m){m.split(",").forEach(function(a){jQuery("#"+a).prop("checked",true)
});
var g=false;
for(var l=0;
l<h.length;
l++){var k=fdc.a09.filterClickHandler({target:h[l]},g);
if(k>0){g=true
}}}var j=fdc.util.getQueryParameter("group");
if(j){jQuery(".a09 [data-group='"+j+"']").click()
}});
/*!
 * c07 Image Carousel
 * Version: 1.1
 */
;
var slideTotal="";
var currentSlide="";
var target="";
function getCurrentSlide(a){slideTotal=jQuery('[data-wrapper="'+a+'"][data-behavior="c07-wrapper"]').children().length;
currentSlide=(jQuery('[data-wrapper="'+a+'"] .c07_table.is-active').index()+1)
}function showHideControls(a){if(slideTotal===currentSlide){jQuery('[data-behavior="scroll-c07-next"][data-target="'+a+'"]').addClass("is-disabled")
}else{jQuery('[data-behavior="scroll-c07-next"][data-target="'+a+'"]').removeClass("is-disabled")
}if(currentSlide===1){jQuery('[data-behavior="scroll-c07-previous"][data-target="'+a+'"]').addClass("is-disabled")
}else{jQuery('[data-behavior="scroll-c07-previous"][data-target="'+a+'"]').removeClass("is-disabled")
}}getCurrentSlide(1);
jQuery(document).on("click",'[data-behavior="scroll-c07-next"]:not(.is-disabled)',function(a){a.preventDefault();
target=jQuery(this).data("target");
jQuery('[data-wrapper="'+target+'"] .c07_table:eq('+currentSlide+")").addClass("is-next");
jQuery('[data-wrapper="'+target+'"] .c07_table.is-previous').removeClass("is-previous");
jQuery('[data-wrapper="'+target+'"] .c07_table.is-active').removeClass("is-active").addClass("is-going-previous");
jQuery('[data-wrapper="'+target+'"] .c07_table.is-going-previous').addClass("is-scrolling-left").one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",function(){jQuery('[data-wrapper="'+target+'"] .c07_table.is-going-previous').removeClass("is-scrolling-left is-going-previous").addClass("is-previous")
});
jQuery('[data-wrapper="'+target+'"] .c07_table.is-next').addClass("is-scrolling-left").one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",function(){jQuery('[data-wrapper="'+target+'"] .c07_table.is-next.is-scrolling-left').removeClass("is-scrolling-left is-next").addClass("is-active");
getCurrentSlide(target);
showHideControls(target);
if(slideTotal>2){jQuery('[data-wrapper="'+target+'"] .c07_table:eq('+currentSlide+")").addClass("is-next")
}})
});
jQuery(document).on("click",'[data-behavior="scroll-c07-previous"]:not(.is-disabled)',function(a){a.preventDefault();
target=jQuery(this).data("target");
jQuery('[data-wrapper="'+target+'"] .c07_table.is-next').removeClass("is-next");
jQuery('[data-wrapper="'+target+'"] .c07_table.is-active').removeClass("is-active").addClass("is-going-next");
jQuery('[data-wrapper="'+target+'"] .c07_table.is-going-next').addClass("is-scrolling-right").one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",function(){jQuery('[data-wrapper="'+target+'"] .c07_table.is-going-next').removeClass("is-scrolling-right is-going-next").addClass("is-next")
});
jQuery('[data-wrapper="'+target+'"] .c07_table.is-previous').addClass("is-scrolling-right").one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",function(){jQuery('[data-wrapper="'+target+'"] .c07_table.is-previous.is-scrolling-right').removeClass("is-scrolling-right is-previous").addClass("is-active");
getCurrentSlide(target);
showHideControls(target);
if(slideTotal>2){jQuery('[data-wrapper="'+target+'"] .c07_table:eq('+(currentSlide-2)+")").addClass("is-previous")
}})
});
jQuery(document).ready(function(){jQuery(".c07v2 .c11v6").equalHeight()
});
jQuery(window).resize(function(){jQuery(".c07v2 .c11v6").css("height","auto");
jQuery(".c07v2 .c11v6").equalHeight()
});
/*!
 * c08 Lightbox
 * Version: 1.7
*/
;
var activeLbox="#c08_modal-image";
$.fn.hasScrollBar=function(a){if(this.length>0){if(a==="vertical"){return this.get(0).scrollHeight>this.innerHeight()
}else{if(a==="horizontal"){return this.get(0).scrollWidth>this.innerWidth()
}}return false
}};
function calculateTopMargin(c){var a="",e="",f="",b="",g=$(c+" .c08"),h=$(c+" .c08_content"),d=$(c+" .c08_title");
a=$(window).innerHeight();
if($(window).width()>=480){h.css("height","auto");
g.css("height","auto");
b=g.outerHeight();
if(h.outerHeight()+d.outerHeight()>a*0.85){g.css("height",(a*0.85));
b=g.outerHeight();
e=((b-d.outerHeight())-32);
h.css("height",e)
}f=(a-b)/2;
g.css({"margin-top":f,top:"auto"})
}else{f=g.css("margin-right");
g.css({"margin-top":f,height:(a-26)});
b=g.outerHeight();
e=((b-d.outerHeight())-32);
h.css("height",e);
if(!h.hasScrollBar("vertical")){h.css("height","auto");
g.css("height","auto");
b=g.outerHeight()
}}}function closec08(){$("html").css("overflow","auto");
$(".c08_modal").fadeOut(200,function(){if($(".c08_modal.is-open").attr("id")==="c08_modal-video"){$("#c08_video-mp4").attr("src","");
$("#c08_video-webm").attr("src","");
$("#c08_video-ogg").attr("src","");
$(".c08_video")[0].load()
}else{if($(".c08_modal.is-open").attr("id")==="c08_modal-youtube"){$("#c08_youtube").attr("src","")
}}$(activeLbox).removeClass("is-open")
})
}function updatec08(a,b){b.preventDefault();
$(".c08_title").html($(a).data("title"));
$(".c08_footer_p").html($(a).data("footer"));
$(activeLbox).addClass("is-open");
calculateTopMargin(activeLbox);
$("html").css("overflow","hidden")
}$(".c08").click(function(a){a.stopPropagation()
});
$('[data-behavior="show-c08_modal-image"]').click(function(b){activeLbox="#c08_modal-image";
var a=$(this).data("image");
$(".c08_image").attr("src",a).load(a);
$(activeLbox).fadeIn(500);
updatec08(this,b)
});
$('[data-behavior="show-c08_modal-video"]').click(function(a){activeLbox="#c08_modal-video";
var b=$(this).data("video");
$("#c08_video-mp4").attr("src",(b+".mp4"));
$("#c08_video-webm").attr("src",(b+".webm"));
$("#c08_video-ogg").attr("src",(b+".ogv"));
$(".c08_video")[0].load();
$(activeLbox).fadeIn(10);
updatec08(this,a)
});
$('[data-behavior="show-c08_modal-youtube"]').click(function(c){activeLbox="#c08_modal-youtube";
var b=$(document).width()*0.8*0.94;
var a=$(this).data("width")/$(this).data("height");
$("#c08_youtube").attr("src",$(this).data("youtube")).attr("height",Math.min(Math.floor(b/a),$(this).data("height"))).attr("width",Math.min(Math.floor(b),$(this).data("width"))).load();
$(activeLbox).fadeIn(10);
updatec08(this,c)
});
$('.c08_modal, [data-behavior="dismiss-c08"]').click(function(){closec08()
});
$(window).resize(function(){calculateTopMargin(activeLbox)
});
$(document).ready(function(){var b=$('[data-behavior="show-c08_modal-image"]'),c=$(".c08_image");
if(b.length>0&&c.length>0){var a=$(b[0]).data("image");
c.attr("src",a).load(a)
}});
$(document).keyup(function(a){if(a.keyCode===27){closec08()
}});
/*!
 * c09 Table Component
 * Version: 1.3.1
 */
;
fdc.c09=fdc.c09||{};
fdc.c09.init=function(){jQuery(".c09v1.has-data-label").each(function(){var a=$(this).find("tr"),b=$(a[0]).children();
a.each(function(c){if(c>0){$(this).find("td,th").each(function(d){$(this).attr("data-label",$(b[d]).text())
})
}})
});
jQuery(".c09v1 table").each(function(){$(this).find("tr:first-child").insertBefore($(this).find("tbody")).wrap("<thead></thead>");
var b=$(this).parent().data("disable-sort-cols"),d=$(this).parent().data("max-configured-col"),c=$(this).find("thead td").length;
if(typeof b==="number"){b=[""+b]
}else{b=b.split(",")
}for(var a=0;
a<b.length;
a++){if(b[a].length>0){$(this).find("thead td:nth-child("+b[a]+")").addClass("sorter-false")
}}for(a=d+1;
a<=c;
a++){$(this).find("thead td:nth-child("+a+")").addClass("sorter-false")
}$(this).tablesorter()
})
};
fdc.c09.reinit=function(a){a.refreshSelf();
fdc.c09.init()
};
$(document).ready(function(){fdc.c09.init()
});
/*!
 * c11 Tile
 * Version: 1.4.1
 */
;
$(document).ready(function(){$(".c11v4, .c11v8").click(function(){$(this).find("a")[0].click()
});
var g=$(".g > :first-child .c11v8").closest(".g");
g.each(function(){$(this).find(".c11v8").css("height","auto").equalHeight()
});
$(window).resize(function(){g.each(function(){$(this).find(".c11v8").css("height","auto").equalHeight()
})
});
$(window).load(function(){g.each(function(){$(this).find(".c11v8").css("height","auto").equalHeight()
})
});
var a=".blog-tiles-v2 .c11v9, .row-count-2 .c11v9, .row-count-3 .c11v9, .row-count-4 .c11v9";
$(a).height("auto").equalHeight();
$(".c11v9 h4").each(function(){fdc.util.ellipsizeText($(this))
});
$(window).resize(function(){$(a).height("auto").equalHeight();
$(".c11v9 h4").each(function(){fdc.util.ellipsizeText($(this))
})
});
var e=$(".highlightFirst .c11v9");
if(e.length>0){e.find(".c11-image-div").height(e.find(".c11-text").outerHeight());
$(window).resize(function(){e.find(".c11-image-div").height(e.find(".c11-text").outerHeight())
});
var c=$(".c05 .c11v9").first();
if(c.length>0){var f=parseInt(e.find(".c11-text").css("padding-right")),b=(c.width()-c.find(".btn").outerWidth())/2,d=e.find(".button");
d.css("right",b-f);
console.log("buttonSpacing: "+b+"    textDivPadding: "+f+"   diff: "+(b-f));
$(window).resize(function(){b=(c.width()-c.find(".btn").outerWidth())/2;
d.css("right",b-f);
console.log("buttonSpacing: "+b+"    textDivPadding: "+f+"   diff: "+(b-f))
})
}}$(".loadmore").on("click",function(){console.log("See more on click button");
var h=$("#currentNodePath").val();
var j=$("#maxItemsVal").val();
if(undefined!=h&&undefined!=j){h=h+".html?initReq=no&startIndex="+j+"&productsCount="+($(".c11v9:not(:last-child) .c11-image-div.solutions").length%7)+"&threatCount="+($(".c11v9:not(:last-child) .c11-image-div.threat").length%7)+"&execCount="+($(".c11v9:not(:last-child) .c11-image-div.exec").length%7);
j=parseInt(j)+9;
$("#maxItemsVal").val(j)
}$.ajax({type:"GET",url:h,dataType:"html",success:function(k){console.log("Data Returned :: "+k);
var l="";
$(k).find(".c11v9:not(.loadmore)").each(function(){l=l+'<div class="c11v9">';
l=l+$(this).html();
l=l+"</div>"
});
console.log(l);
$(".loadmore").before(l);
if($(k).find(".c11v9:not(.loadmore)").length<9){$(".loadmore").hide()
}$(a).height("auto").equalHeight()
},error:function(k){console.log("Error:: "+k);
$(".loadmore").hide()
}})
})
});
/*!
 * c13 Vidyard Video
 * Version: 1.0
 */
;
fdc.c13=fdc.c13||{};
fdc.c13.reheight=function(e,d){var f=d||0.5625;
e.height(e.width()*f)
};
$(document).ready(function(){var b=$(".c04 .c13 span span, .he01 .c13 span span");
$(window).resize(function(){b.each(function(){fdc.c13.reheight($(this))
})
})
});
/*!
 * c14 Badge Highlight
 * Version: 1.3
*/
;
jQuery(document).ready(function(){function a(){$(".c14").each(function(e){var b=Math.ceil((jQuery(this).height())/2);
var d=Math.ceil(((jQuery(this).find(".c14-text .c14-badge").height())+127)/2);
var g=22;
var f=14;
var c=jQuery(this).hasClass("gray")?"#f2f2f2":"#fff";
jQuery(this).find(".c14-background").css({"background-image":"linear-gradient(300deg,transparent "+b+"px,"+c+" "+(b+1)+"px)","background-image":"-moz-linear-gradient(-210deg,transparent "+b+"px,"+c+" "+(b+1)+"px)","background-image":"-webkit-linear-gradient(-210deg,transparent "+b+"px,"+c+" "+(b+1)+"px)"});
jQuery(this).find(".c14-text .c14-badge").css({"background-image":"linear-gradient(300deg,transparent "+(d-g)+"px,#d82435 "+(d-g+1)+"px,#d82435 "+(d-g+f-2)+"px,rgba(0,0,0,0) "+(d-g+f-1)+"px)","background-image":"-moz-linear-gradient(-210deg,transparent "+(d-g)+"px,#d82435 "+(d-g+1)+"px,#d82435 "+(d-g+f-2)+"px,rgba(0,0,0,0) "+(d-g+f-1)+"px)","background-image":"-webkit-linear-gradient(-210deg,transparent "+(d-g)+"px,#d82435 "+(d-g+1)+"px,#d82435 "+(d-g+f-2)+"px,rgba(0,0,0,0) "+(d-g+f-1)+"px)"})
})
}a();
$(window).resize(function(){a()
});
$(".c14").each(function(){$(this).find(".c14-badge").equalHeight()
})
});
/*!
 * c16 Content Carousel
 * Version: 1.0
 */
;
(function(w,t,r,y){var v,C,u;
v={start:0,startX:0,startY:0,current:0,currentX:0,currentY:0,offsetX:0,offsetY:0,distance:null,startTime:0,endTime:0,updatedX:0,targetEl:null};
C={isTouch:false,isScrolling:false,isSwiping:false,direction:false,inMotion:false};
u={_onDragStart:null,_onDragMove:null,_onDragEnd:null,_transitionEnd:null,_resizer:null,_responsiveCall:null,_goToLoop:null,_checkVisibile:null};
function A(a,b){this.settings=null;
this.options=w.extend({},A.Defaults,b);
this.$element=w(a);
this.drag=w.extend({},v);
this.state=w.extend({},C);
this.e=w.extend({},u);
this._plugins={};
this._supress={};
this._current=null;
this._speed=null;
this._coordinates=[];
this._breakpoint=null;
this._width=null;
this._items=[];
this._clones=[];
this._mergers=[];
this._invalidated={};
this._pipe=[];
w.each(A.Plugins,w.proxy(function(d,c){this._plugins[d[0].toLowerCase()+d.slice(1)]=new c(this)
},this));
w.each(A.Pipe,w.proxy(function(d,c){this._pipe.push({filter:c.filter,run:w.proxy(c.run,this)})
},this));
this.setup();
this.initialize()
}A.Defaults={items:3,loop:false,center:false,mouseDrag:true,touchDrag:true,pullDrag:true,freeDrag:false,margin:0,stagePadding:0,merge:false,mergeFit:true,autoWidth:false,startPosition:0,rtl:false,smartSpeed:250,fluidSpeed:false,dragEndSpeed:false,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:t,responsiveClass:false,fallbackEasing:"swing",info:false,nestedItemSelector:false,itemElement:"div",stageElement:"div",themeClass:"c16-theme",baseClass:"c16-carousel",itemClass:"c16-item",centerClass:"center",activeClass:"active"};
A.Width={Default:"default",Inner:"inner",Outer:"outer"};
A.Plugins={};
A.Pipe=[{filter:["width","items","settings"],run:function(a){a.current=this._items&&this._items[this.relative(this._current)]
}},{filter:["items","settings"],run:function(){var b=this._clones,a=this.$stage.children(".cloned");
if(a.length!==b.length||(!this.settings.loop&&b.length>0)){this.$stage.children(".cloned").remove();
this._clones=[]
}}},{filter:["items","settings"],run:function(){var d,a,c=this._clones,f=this._items,b=this.settings.loop?c.length-Math.max(this.settings.items*2,4):0;
for(d=0,a=Math.abs(b/2);
d<a;
d++){if(b>0){this.$stage.children().eq(f.length+c.length-1).remove();
c.pop();
this.$stage.children().eq(0).remove();
c.pop()
}else{c.push(c.length/2);
this.$stage.append(f[c[c.length-1]].clone().addClass("cloned"));
c.push(f.length-1-(c.length-1)/2);
this.$stage.prepend(f[c[c.length-1]].clone().addClass("cloned"))
}}}},{filter:["width","items","settings"],run:function(){var d=(this.settings.rtl?1:-1),f=(this.width()/this.settings.items).toFixed(3),a=0,b,g,c;
this._coordinates=[];
for(g=0,c=this._clones.length+this._items.length;
g<c;
g++){b=this._mergers[this.relative(g)];
b=(this.settings.mergeFit&&Math.min(b,this.settings.items))||b;
a+=(this.settings.autoWidth?this._items[this.relative(g)].width()+this.settings.margin:f*b)*d;
this._coordinates.push(a)
}}},{filter:["width","items","settings"],run:function(){var c,a,b=(this.width()/this.settings.items).toFixed(3),d={width:Math.abs(this._coordinates[this._coordinates.length-1])+this.settings.stagePadding*2,"padding-left":this.settings.stagePadding||"","padding-right":this.settings.stagePadding||""};
this.$stage.css(d);
d={width:this.settings.autoWidth?"auto":b-this.settings.margin};
d[this.settings.rtl?"margin-left":"margin-right"]=this.settings.margin;
if(!this.settings.autoWidth&&w.grep(this._mergers,function(f){return f>1
}).length>0){for(c=0,a=this._coordinates.length;
c<a;
c++){d.width=Math.abs(this._coordinates[c])-Math.abs(this._coordinates[c-1]||0)-this.settings.margin;
this.$stage.children().eq(c).css(d)
}}else{this.$stage.children().css(d)
}}},{filter:["width","items","settings"],run:function(a){a.current&&this.reset(this.$stage.children().index(a.current))
}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))
}},{filter:["width","position","items","settings"],run:function(){var h=this.settings.rtl?1:-1,g=this.settings.stagePadding*2,b=this.coordinates(this.current())+g,a=b+this.width()*h,d,f,j=[],k,c;
for(k=0,c=this._coordinates.length;
k<c;
k++){d=this._coordinates[k-1]||0;
f=Math.abs(this._coordinates[k])+g*h;
if((this.op(d,"<=",b)&&(this.op(d,">",a)))||(this.op(f,"<",b)&&this.op(f,">",a))){j.push(k)
}}this.$stage.children("."+this.settings.activeClass).removeClass(this.settings.activeClass);
this.$stage.children(":eq("+j.join("), :eq(")+")").addClass(this.settings.activeClass);
if(this.settings.center){this.$stage.children("."+this.settings.centerClass).removeClass(this.settings.centerClass);
this.$stage.children().eq(this.current()).addClass(this.settings.centerClass)
}}}];
A.prototype.initialize=function(){this.trigger("initialize");
this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("c16-rtl",this.settings.rtl);
this.browserSupport();
if(this.settings.autoWidth&&this.state.imagesLoaded!==true){var a,b,c;
a=this.$element.find("img");
b=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:y;
c=this.$element.children(b).width();
if(a.length&&c<=0){this.preloadAutoWidthImages(a);
return false
}}this.$element.addClass("c16-loading");
this.$stage=w("<"+this.settings.stageElement+' class="c16-stage"/>').wrap('<div class="c16-stage-outer">');
this.$element.append(this.$stage.parent());
this.replace(this.$element.children().not(this.$stage.parent()));
this._width=this.$element.width();
this.refresh();
this.$element.removeClass("c16-loading").addClass("c16-loaded");
this.eventsCall();
this.internalEvents();
this.addTriggerableEvents();
this.trigger("initialized")
};
A.prototype.setup=function(){var d=this.viewport(),b=this.options.responsive,c=-1,a=null;
if(!b){a=w.extend({},this.options)
}else{w.each(b,function(f){if(f<=d&&f>c){c=Number(f)
}});
a=w.extend({},this.options,b[c]);
delete a.responsive;
if(a.responsiveClass){this.$element.attr("class",function(g,f){return f.replace(/\b c16-responsive-\S+/g,"")
}).addClass("c16-responsive-"+c)
}}if(this.settings===null||this._breakpoint!==c){this.trigger("change",{property:{name:"settings",value:a}});
this._breakpoint=c;
this.settings=a;
this.invalidate("settings");
this.trigger("changed",{property:{name:"settings",value:this.settings}})
}};
A.prototype.optionsLogic=function(){this.$element.toggleClass("c16-center",this.settings.center);
if(this.settings.loop&&this._items.length<this.settings.items){this.settings.loop=false
}if(this.settings.autoWidth){this.settings.stagePadding=false;
this.settings.merge=false
}};
A.prototype.prepare=function(a){var b=this.trigger("prepare",{content:a});
if(!b.data){b.data=w("<"+this.settings.itemElement+"/>").addClass(this.settings.itemClass).append(a)
}this.trigger("prepared",{content:b.data});
return b.data
};
A.prototype.update=function(){var c=0,a=this._pipe.length,b=w.proxy(function(f){return this[f]
},this._invalidated),d={};
while(c<a){if(this._invalidated.all||w.grep(this._pipe[c].filter,b).length>0){this._pipe[c].run(d)
}c++
}this._invalidated={}
};
A.prototype.width=function(a){a=a||A.Width.Default;
switch(a){case A.Width.Inner:case A.Width.Outer:return this._width;
default:return this._width-this.settings.stagePadding*2+this.settings.margin
}};
A.prototype.refresh=function(){if(this._items.length===0){return false
}var a=new Date().getTime();
this.trigger("refresh");
this.setup();
this.optionsLogic();
this.$stage.addClass("c16-refresh");
this.update();
this.$stage.removeClass("c16-refresh");
this.state.orientation=t.orientation;
this.watchVisibility();
this.trigger("refreshed")
};
A.prototype.eventsCall=function(){this.e._onDragStart=w.proxy(function(a){this.onDragStart(a)
},this);
this.e._onDragMove=w.proxy(function(a){this.onDragMove(a)
},this);
this.e._onDragEnd=w.proxy(function(a){this.onDragEnd(a)
},this);
this.e._onResize=w.proxy(function(a){this.onResize(a)
},this);
this.e._transitionEnd=w.proxy(function(a){this.transitionEnd(a)
},this);
this.e._preventClick=w.proxy(function(a){this.preventClick(a)
},this)
};
A.prototype.onThrottledResize=function(){t.clearTimeout(this.resizeTimer);
this.resizeTimer=t.setTimeout(this.e._onResize,this.settings.responsiveRefreshRate)
};
A.prototype.onResize=function(){if(!this._items.length){return false
}if(this._width===this.$element.width()){return false
}if(this.trigger("resize").isDefaultPrevented()){return false
}this._width=this.$element.width();
this.invalidate("width");
this.refresh();
this.trigger("resized")
};
A.prototype.eventsRouter=function(a){var b=a.type;
if(b==="mousedown"||b==="touchstart"){this.onDragStart(a)
}else{if(b==="mousemove"||b==="touchmove"){this.onDragMove(a)
}else{if(b==="mouseup"||b==="touchend"){this.onDragEnd(a)
}else{if(b==="touchcancel"){this.onDragEnd(a)
}}}}};
A.prototype.internalEvents=function(){var b=s(),a=e();
if(this.settings.mouseDrag){this.$stage.on("mousedown",w.proxy(function(c){this.eventsRouter(c)
},this));
this.$stage.on("dragstart",function(){return false
});
this.$stage.get(0).onselectstart=function(){return false
}
}else{this.$element.addClass("c16-text-select-on")
}if(this.settings.touchDrag&&!a){this.$stage.on("touchstart touchcancel",w.proxy(function(c){this.eventsRouter(c)
},this))
}if(this.transitionEndVendor){this.on(this.$stage.get(0),this.transitionEndVendor,this.e._transitionEnd,false)
}if(this.settings.responsive!==false){this.on(t,"resize",w.proxy(this.onThrottledResize,this))
}};
A.prototype.onDragStart=function(b){var c,a,d,f,g;
c=b.originalEvent||b||t.event;
if(c.which===3||this.state.isTouch){return false
}if(c.type==="mousedown"){this.$stage.addClass("c16-grab")
}this.trigger("drag");
this.drag.startTime=new Date().getTime();
this.speed(0);
this.state.isTouch=true;
this.state.isScrolling=false;
this.state.isSwiping=false;
this.drag.distance=0;
d=B(c).x;
f=B(c).y;
this.drag.offsetX=this.$stage.position().left;
this.drag.offsetY=this.$stage.position().top;
if(this.settings.rtl){this.drag.offsetX=this.$stage.position().left+this.$stage.width()-this.width()+this.settings.margin
}if(this.state.inMotion&&this.support3d){g=this.getTransformProperty();
this.drag.offsetX=g;
this.animate(g);
this.state.inMotion=true
}else{if(this.state.inMotion&&!this.support3d){this.state.inMotion=false;
return false
}}this.drag.startX=d-this.drag.offsetX;
this.drag.startY=f-this.drag.offsetY;
this.drag.start=d-this.drag.startX;
this.drag.targetEl=c.target||c.srcElement;
this.drag.updatedX=this.drag.start;
if(this.drag.targetEl.tagName==="IMG"||this.drag.targetEl.tagName==="A"){this.drag.targetEl.draggable=false
}w(r).on("mousemove.c16.dragEvents mouseup.c16.dragEvents touchmove.c16.dragEvents touchend.c16.dragEvents",w.proxy(function(h){this.eventsRouter(h)
},this))
};
A.prototype.onDragMove=function(f){var g,a,h,j,c,b,d;
if(!this.state.isTouch){return
}if(this.state.isScrolling){return
}g=f.originalEvent||f||t.event;
h=B(g).x;
j=B(g).y;
this.drag.currentX=h-this.drag.startX;
this.drag.currentY=j-this.drag.startY;
this.drag.distance=this.drag.currentX-this.drag.offsetX;
if(this.drag.distance<0){this.state.direction=this.settings.rtl?"right":"left"
}else{if(this.drag.distance>0){this.state.direction=this.settings.rtl?"left":"right"
}}if(this.settings.loop){if(this.op(this.drag.currentX,">",this.coordinates(this.minimum()))&&this.state.direction==="right"){this.drag.currentX-=(this.settings.center&&this.coordinates(0))-this.coordinates(this._items.length)
}else{if(this.op(this.drag.currentX,"<",this.coordinates(this.maximum()))&&this.state.direction==="left"){this.drag.currentX+=(this.settings.center&&this.coordinates(0))-this.coordinates(this._items.length)
}}}else{c=this.settings.rtl?this.coordinates(this.maximum()):this.coordinates(this.minimum());
b=this.settings.rtl?this.coordinates(this.minimum()):this.coordinates(this.maximum());
d=this.settings.pullDrag?this.drag.distance/5:0;
this.drag.currentX=Math.max(Math.min(this.drag.currentX,c+d),b+d)
}if((this.drag.distance>8||this.drag.distance<-8)){if(g.preventDefault!==y){g.preventDefault()
}else{g.returnValue=false
}this.state.isSwiping=true
}this.drag.updatedX=this.drag.currentX;
if((this.drag.currentY>16||this.drag.currentY<-16)&&this.state.isSwiping===false){this.state.isScrolling=true;
this.drag.updatedX=this.drag.start
}this.animate(this.drag.updatedX)
};
A.prototype.onDragEnd=function(a){var c,d,b;
if(!this.state.isTouch){return
}if(a.type==="mouseup"){this.$stage.removeClass("c16-grab")
}this.trigger("dragged");
this.drag.targetEl.removeAttribute("draggable");
this.state.isTouch=false;
this.state.isScrolling=false;
this.state.isSwiping=false;
if(this.drag.distance===0&&this.state.inMotion!==true){this.state.inMotion=false;
return false
}this.drag.endTime=new Date().getTime();
c=this.drag.endTime-this.drag.startTime;
d=Math.abs(this.drag.distance);
if(d>3||c>300){this.removeClick(this.drag.targetEl)
}b=this.closest(this.drag.updatedX);
this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed);
this.current(b);
this.invalidate("position");
this.update();
if(!this.settings.pullDrag&&this.drag.updatedX===this.coordinates(b)){this.transitionEnd()
}this.drag.distance=0;
w(r).off(".c16.dragEvents")
};
A.prototype.removeClick=function(a){this.drag.targetEl=a;
w(a).on("click.preventClick",this.e._preventClick);
t.setTimeout(function(){w(a).off("click.preventClick")
},300)
};
A.prototype.preventClick=function(a){if(a.preventDefault){a.preventDefault()
}else{a.returnValue=false
}if(a.stopPropagation){a.stopPropagation()
}w(a.target).off("click.preventClick")
};
A.prototype.getTransformProperty=function(){var b,a;
b=t.getComputedStyle(this.$stage.get(0),null).getPropertyValue(this.vendorName+"transform");
b=b.replace(/matrix(3d)?\(|\)/g,"").split(",");
a=b.length===16;
return a!==true?b[4]:b[12]
};
A.prototype.closest=function(a){var f=-1,c=30,d=this.width(),b=this.coordinates();
if(!this.settings.freeDrag){w.each(b,w.proxy(function(h,g){if(a>g-c&&a<g+c){f=h
}else{if(this.op(a,"<",g)&&this.op(a,">",b[h+1]||g-d)){f=this.state.direction==="left"?h+1:h
}}return f===-1
},this))
}if(!this.settings.loop){if(this.op(a,">",b[this.minimum()])){f=a=this.minimum()
}else{if(this.op(a,"<",b[this.maximum()])){f=a=this.maximum()
}}}return f
};
A.prototype.animate=function(a){this.trigger("translate");
this.state.inMotion=this.speed()>0;
if(this.support3d){this.$stage.css({transform:"translate3d("+a+"px,0px, 0px)",transition:(this.speed()/1000)+"s"})
}else{if(this.state.isTouch){this.$stage.css({left:a+"px"})
}else{this.$stage.animate({left:a},this.speed()/1000,this.settings.fallbackEasing,w.proxy(function(){if(this.state.inMotion){this.transitionEnd()
}},this))
}}};
A.prototype.current=function(b){if(b===y){return this._current
}if(this._items.length===0){return y
}b=this.normalize(b);
if(this._current!==b){var a=this.trigger("change",{property:{name:"position",value:b}});
if(a.data!==y){b=this.normalize(a.data)
}this._current=b;
this.invalidate("position");
this.trigger("changed",{property:{name:"position",value:this._current}})
}return this._current
};
A.prototype.invalidate=function(a){this._invalidated[a]=true
};
A.prototype.reset=function(a){a=this.normalize(a);
if(a===y){return
}this._speed=0;
this._current=a;
this.suppress(["translate","translated"]);
this.animate(this.coordinates(a));
this.release(["translate","translated"])
};
A.prototype.normalize=function(c,b){var a=(b?this._items.length:this._items.length+this._clones.length);
if(!w.isNumeric(c)||a<1){return y
}if(this._clones.length){c=((c%a)+a)%a
}else{c=Math.max(this.minimum(b),Math.min(this.maximum(b),c))
}return c
};
A.prototype.relative=function(a){a=this.normalize(a);
a=a-this._clones.length/2;
return this.normalize(a,true)
};
A.prototype.maximum=function(c){var b,d,g=0,a,f=this.settings;
if(c){return this._items.length-1
}if(!f.loop&&f.center){b=this._items.length-1
}else{if(!f.loop&&!f.center){b=this._items.length-f.items
}else{if(f.loop||f.center){b=this._items.length+f.items
}else{if(f.autoWidth||f.merge){revert=f.rtl?1:-1;
d=this.$stage.width()-this.$element.width();
while(a=this.coordinates(g)){if(a*revert>=d){break
}b=++g
}}else{throw"Can not detect maximum absolute position."
}}}}return b
};
A.prototype.minimum=function(a){if(a){return 0
}return this._clones.length/2
};
A.prototype.items=function(a){if(a===y){return this._items.slice()
}a=this.normalize(a,true);
return this._items[a]
};
A.prototype.mergers=function(a){if(a===y){return this._mergers.slice()
}a=this.normalize(a,true);
return this._mergers[a]
};
A.prototype.clones=function(d){var c=this._clones.length/2,a=c+this._items.length,b=function(f){return f%2===0?a+f/2:c-(f+1)/2
};
if(d===y){return w.map(this._clones,function(g,f){return b(f)
})
}return w.map(this._clones,function(g,f){return g===d?b(f):null
})
};
A.prototype.speed=function(a){if(a!==y){this._speed=a
}return this._speed
};
A.prototype.coordinates=function(b){var a=null;
if(b===y){return w.map(this._coordinates,w.proxy(function(c,d){return this.coordinates(d)
},this))
}if(this.settings.center){a=this._coordinates[b];
a+=(this.width()-a+(this._coordinates[b-1]||0))/2*(this.settings.rtl?-1:1)
}else{a=this._coordinates[b-1]||0
}return a
};
A.prototype.duration=function(a,b,c){return Math.min(Math.max(Math.abs(b-a),1),6)*Math.abs((c||this.settings.smartSpeed))
};
A.prototype.to=function(j,d){if(this.settings.loop){var a=j-this.relative(this.current()),h=this.current(),f=this.current(),b=this.current()+a,c=f-b<0?true:false,g=this._clones.length+this._items.length;
if(b<this.settings.items&&c===false){h=f+this._items.length;
this.reset(h)
}else{if(b>=g-this.settings.items&&c===true){h=f-this._items.length;
this.reset(h)
}}t.clearTimeout(this.e._goToLoop);
this.e._goToLoop=t.setTimeout(w.proxy(function(){this.speed(this.duration(this.current(),h+a,d));
this.current(h+a);
this.update()
},this),30)
}else{this.speed(this.duration(this.current(),j,d));
this.current(j);
this.update()
}};
A.prototype.next=function(a){a=a||false;
this.to(this.relative(this.current())+1,a)
};
A.prototype.prev=function(a){a=a||false;
this.to(this.relative(this.current())-1,a)
};
A.prototype.transitionEnd=function(a){if(a!==y){a.stopPropagation();
if((a.target||a.srcElement||a.originalTarget)!==this.$stage.get(0)){return false
}}this.state.inMotion=false;
this.trigger("translated")
};
A.prototype.viewport=function(){var a;
if(this.options.responsiveBaseElement!==t){a=w(this.options.responsiveBaseElement).width()
}else{if(t.innerWidth){a=t.innerWidth
}else{if(r.documentElement&&r.documentElement.clientWidth){a=r.documentElement.clientWidth
}else{throw"Can not detect viewport width."
}}}return a
};
A.prototype.replace=function(a){this.$stage.empty();
this._items=[];
if(a){a=(a instanceof jQuery)?a:w(a)
}if(this.settings.nestedItemSelector){a=a.find("."+this.settings.nestedItemSelector)
}a.filter(function(){return this.nodeType===1
}).each(w.proxy(function(c,b){b=this.prepare(b);
this.$stage.append(b);
this._items.push(b);
this._mergers.push(b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge")*1||1)
},this));
this.reset(w.isNumeric(this.settings.startPosition)?this.settings.startPosition:0);
this.invalidate("items")
};
A.prototype.add=function(a,b){b=b===y?this._items.length:this.normalize(b,true);
this.trigger("add",{content:a,position:b});
if(this._items.length===0||b===this._items.length){this.$stage.append(a);
this._items.push(a);
this._mergers.push(a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge")*1||1)
}else{this._items[b].before(a);
this._items.splice(b,0,a);
this._mergers.splice(b,0,a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge")*1||1)
}this.invalidate("items");
this.trigger("added",{content:a,position:b})
};
A.prototype.remove=function(a){a=this.normalize(a,true);
if(a===y){return
}this.trigger("remove",{content:this._items[a],position:a});
this._items[a].remove();
this._items.splice(a,1);
this._mergers.splice(a,1);
this.invalidate("items");
this.trigger("removed",{content:null,position:a})
};
A.prototype.addTriggerableEvents=function(){var a=w.proxy(function(b,c){return w.proxy(function(d){if(d.relatedTarget!==this){this.suppress([c]);
b.apply(this,[].slice.call(arguments,1));
this.release([c])
}},this)
},this);
w.each({next:this.next,prev:this.prev,to:this.to,destroy:this.destroy,refresh:this.refresh,replace:this.replace,add:this.add,remove:this.remove},w.proxy(function(c,b){this.$element.on(c+".c16.carousel",a(b,c+".c16.carousel"))
},this))
};
A.prototype.watchVisibility=function(){if(!a(this.$element.get(0))){this.$element.addClass("c16-hidden");
t.clearInterval(this.e._checkVisibile);
this.e._checkVisibile=t.setInterval(w.proxy(b,this),500)
}function a(c){return c.offsetWidth>0&&c.offsetHeight>0
}function b(){if(a(this.$element.get(0))){this.$element.removeClass("c16-hidden");
this.refresh();
t.clearInterval(this.e._checkVisibile)
}}};
A.prototype.preloadAutoWidthImages=function(a){var d,b,c,f;
d=0;
b=this;
a.each(function(h,g){c=w(g);
f=new Image();
f.onload=function(){d++;
c.attr("src",f.src);
c.css("opacity",1);
if(d>=a.length){b.state.imagesLoaded=true;
b.initialize()
}};
f.src=c.attr("src")||c.attr("data-src")||c.attr("data-src-retina")
})
};
A.prototype.destroy=function(){if(this.$element.hasClass(this.settings.themeClass)){this.$element.removeClass(this.settings.themeClass)
}if(this.settings.responsive!==false){w(t).off("resize.c16.carousel")
}if(this.transitionEndVendor){this.off(this.$stage.get(0),this.transitionEndVendor,this.e._transitionEnd)
}for(var a in this._plugins){this._plugins[a].destroy()
}if(this.settings.mouseDrag||this.settings.touchDrag){this.$stage.off("mousedown touchstart touchcancel");
w(r).off(".c16.dragEvents");
this.$stage.get(0).onselectstart=function(){};
this.$stage.off("dragstart",function(){return false
})
}this.$element.off(".c16");
this.$stage.children(".cloned").remove();
this.e=null;
this.$element.removeData("c16Carousel");
this.$stage.children().contents().unwrap();
this.$stage.children().unwrap();
this.$stage.unwrap()
};
A.prototype.op=function(c,a,d){var b=this.settings.rtl;
switch(a){case"<":return b?c>d:c<d;
case">":return b?c<d:c>d;
case">=":return b?c<=d:c>=d;
case"<=":return b?c>=d:c<=d;
default:break
}};
A.prototype.on=function(c,b,a,d){if(c.addEventListener){c.addEventListener(b,a,d)
}else{if(c.attachEvent){c.attachEvent("on"+b,a)
}}};
A.prototype.off=function(c,b,a,d){if(c.removeEventListener){c.removeEventListener(b,a,d)
}else{if(c.detachEvent){c.detachEvent("on"+b,a)
}}};
A.prototype.trigger=function(f,a,c){var g={item:{count:this._items.length,index:this.current()}},d=w.camelCase(w.grep(["on",f,c],function(h){return h
}).join("-").toLowerCase()),b=w.Event([f,"c16",c||"carousel"].join(".").toLowerCase(),w.extend({relatedTarget:this},g,a));
if(!this._supress[f]){w.each(this._plugins,function(j,h){if(h.onTrigger){h.onTrigger(b)
}});
this.$element.trigger(b);
if(this.settings&&typeof this.settings[d]==="function"){this.settings[d].apply(this,b)
}}return b
};
A.prototype.suppress=function(a){w.each(a,w.proxy(function(c,b){this._supress[b]=true
},this))
};
A.prototype.release=function(a){w.each(a,w.proxy(function(c,b){delete this._supress[b]
},this))
};
A.prototype.browserSupport=function(){this.support3d=q();
if(this.support3d){this.transformVendor=z();
var a=["transitionend","webkitTransitionEnd","transitionend","oTransitionEnd"];
this.transitionEndVendor=a[x()];
this.vendorName=this.transformVendor.replace(/Transform/i,"");
this.vendorName=this.vendorName!==""?"-"+this.vendorName.toLowerCase()+"-":""
}this.state.orientation=t.orientation
};
function B(a){if(a.touches!==y){return{x:a.touches[0].pageX,y:a.touches[0].pageY}
}if(a.touches===y){if(a.pageX!==y){return{x:a.pageX,y:a.pageY}
}if(a.pageX===y){return{x:a.clientX,y:a.clientY}
}}}function D(a){var b,d,f=r.createElement("div"),c=a;
for(b in c){d=c[b];
if(typeof f.style[d]!=="undefined"){f=null;
return[d,b]
}}return[false]
}function x(){return D(["transition","WebkitTransition","MozTransition","OTransition"])[1]
}function z(){return D(["transform","WebkitTransform","MozTransform","OTransform","msTransform"])[0]
}function q(){return D(["perspective","webkitPerspective","MozPerspective","OPerspective","MsPerspective"])[0]
}function s(){return"ontouchstart" in t||!!(navigator.msMaxTouchPoints)
}function e(){return t.navigator.msPointerEnabled
}w.fn.c16Carousel=function(a){return this.each(function(){if(!w(this).data("c16Carousel")){w(this).data("c16Carousel",new A(this,a))
}})
};
w.fn.c16Carousel.Constructor=A
})(window.Zepto||window.jQuery,window,document);
(function(j,k,g,h){var f=function(a){this._core=a;
this._loaded=[];
this._handlers={"initialized.c16.carousel change.c16.carousel":j.proxy(function(b){if(!b.namespace){return
}if(!this._core.settings||!this._core.settings.lazyLoad){return
}if((b.property&&b.property.name=="position")||b.type=="initialized"){var e=this._core.settings,q=(e.center&&Math.ceil(e.items/2)||e.items),n=((e.center&&q*-1)||0),p=((b.property&&b.property.value)||this._core.current())+n,c=this._core.clones().length,d=j.proxy(function(l,m){this.load(m)
},this);
while(n++<q){this.load(c/2+this._core.relative(p));
c&&j.each(this._core.clones(this._core.relative(p++)),d)
}}},this)};
this._core.options=j.extend({},f.Defaults,this._core.options);
this._core.$element.on(this._handlers)
};
f.Defaults={lazyLoad:false};
f.prototype.load=function(c){var b=this._core.$stage.children().eq(c),a=b&&b.find(".c16-lazy");
if(!a||j.inArray(b.get(0),this._loaded)>-1){return
}a.each(j.proxy(function(n,e){var p=j(e),d,o=(k.devicePixelRatio>1&&p.attr("data-src-retina"))||p.attr("data-src");
this._core.trigger("load",{element:p,url:o},"lazy");
if(p.is("img")){p.one("load.c16.lazy",j.proxy(function(){p.css("opacity",1);
this._core.trigger("loaded",{element:p,url:o},"lazy")
},this)).attr("src",o)
}else{d=new Image();
d.onload=j.proxy(function(){p.css({"background-image":"url("+o+")",opacity:"1"});
this._core.trigger("loaded",{element:p,url:o},"lazy")
},this);
d.src=o
}},this));
this._loaded.push(b.get(0))
};
f.prototype.destroy=function(){var b,a;
for(b in this.handlers){this._core.$element.off(b,this.handlers[b])
}for(a in Object.getOwnPropertyNames(this)){typeof this[a]!="function"&&(this[a]=null)
}};
j.fn.c16Carousel.Constructor.Plugins.Lazy=f
})(window.Zepto||window.jQuery,window,document);
(function(k,f,g,j){var h=function(a){this._core=a;
this._handlers={"initialized.c16.carousel":k.proxy(function(){if(this._core.settings.autoHeight){this.update()
}},this),"changed.c16.carousel":k.proxy(function(b){if(this._core.settings.autoHeight&&b.property.name=="position"){this.update()
}},this),"loaded.c16.lazy":k.proxy(function(b){if(this._core.settings.autoHeight&&b.element.closest("."+this._core.settings.itemClass)===this._core.$stage.children().eq(this._core.current())){this.update()
}},this)};
this._core.options=k.extend({},h.Defaults,this._core.options);
this._core.$element.on(this._handlers)
};
h.Defaults={autoHeight:false,autoHeightClass:"c16-height"};
h.prototype.update=function(){this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)
};
h.prototype.destroy=function(){var b,a;
for(b in this._handlers){this._core.$element.off(b,this._handlers[b])
}for(a in Object.getOwnPropertyNames(this)){typeof this[a]!="function"&&(this[a]=null)
}};
k.fn.c16Carousel.Constructor.Plugins.AutoHeight=h
})(window.Zepto||window.jQuery,window,document);
(function(j,k,g,h){var f=function(a){this._core=a;
this._videos={};
this._playing=null;
this._fullscreen=false;
this._handlers={"resize.c16.carousel":j.proxy(function(b){if(this._core.settings.video&&!this.isInFullScreen()){b.preventDefault()
}},this),"refresh.c16.carousel changed.c16.carousel":j.proxy(function(b){if(this._playing){this.stop()
}},this),"prepared.c16.carousel":j.proxy(function(b){var c=j(b.content).find(".c16-video");
if(c.length){c.css("display","none");
this.fetch(c,j(b.content))
}},this)};
this._core.options=j.extend({},f.Defaults,this._core.options);
this._core.$element.on(this._handlers);
this._core.$element.on("click.c16.video",".c16-video-play-icon",j.proxy(function(b){this.play(b)
},this))
};
f.Defaults={video:false,videoHeight:false,videoWidth:false};
f.prototype.fetch=function(b,c){var d=b.attr("data-vimeo-id")?"vimeo":"youtube",a=b.attr("data-vimeo-id")||b.attr("data-youtube-id"),e=b.attr("data-width")||this._core.settings.videoWidth,n=b.attr("data-height")||this._core.settings.videoHeight,m=b.attr("href");
if(m){a=m.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);
if(a[3].indexOf("youtu")>-1){d="youtube"
}else{if(a[3].indexOf("vimeo")>-1){d="vimeo"
}else{throw new Error("Video URL not supported.")
}}a=a[6]
}else{throw new Error("Missing video URL.")
}this._videos[m]={type:d,id:a,width:e,height:n};
c.attr("data-video",m);
this.thumbnail(b,this._videos[m])
};
f.prototype.thumbnail=function(e,t){var u,c,a,v=t.width&&t.height?'style="width:'+t.width+"px;height:"+t.height+'px;"':"",d=e.find("img"),b="src",q="",s=this._core.settings,r=function(l){c='<div class="c16-video-play-icon"></div>';
if(s.lazyLoad){u='<div class="c16-video-tn '+q+'" '+b+'="'+l+'"></div>'
}else{u='<div class="c16-video-tn" style="opacity:1;background-image:url('+l+')"></div>'
}e.after(u);
e.after(c)
};
e.wrap('<div class="c16-video-wrapper"'+v+"></div>");
if(this._core.settings.lazyLoad){b="data-src";
q="c16-lazy"
}if(d.length){r(d.attr(b));
d.remove();
return false
}if(t.type==="youtube"){a="http://img.youtube.com/vi/"+t.id+"/hqdefault.jpg";
r(a)
}else{if(t.type==="vimeo"){j.ajax({type:"GET",url:"http://vimeo.com/api/v2/video/"+t.id+".json",jsonp:"callback",dataType:"jsonp",success:function(l){a=l[0].thumbnail_large;
r(a)
}})
}}};
f.prototype.stop=function(){this._core.trigger("stop",null,"video");
this._playing.find(".c16-video-frame").remove();
this._playing.removeClass("c16-video-playing");
this._playing=null
};
f.prototype.play=function(b){this._core.trigger("play",null,"video");
if(this._playing){this.stop()
}var a=j(b.target||b.srcElement),c=a.closest("."+this._core.settings.itemClass),d=this._videos[c.attr("data-video")],e=d.width||"100%",p=d.height||this._core.$stage.height(),o,n;
if(d.type==="youtube"){o='<iframe width="'+e+'" height="'+p+'" src="http://www.youtube.com/embed/'+d.id+"?autoplay=1&v="+d.id+'" frameborder="0" allowfullscreen></iframe>'
}else{if(d.type==="vimeo"){o='<iframe src="http://player.vimeo.com/video/'+d.id+'?autoplay=1" width="'+e+'" height="'+p+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
}}c.addClass("c16-video-playing");
this._playing=c;
n=j('<div style="height:'+p+"px; width:"+e+'px" class="c16-video-frame">'+o+"</div>");
a.after(n)
};
f.prototype.isInFullScreen=function(){var a=g.fullscreenElement||g.mozFullScreenElement||g.webkitFullscreenElement;
if(a&&j(a).parent().hasClass("c16-video-frame")){this._core.speed(0);
this._fullscreen=true
}if(a&&this._fullscreen&&this._playing){return false
}if(this._fullscreen){this._fullscreen=false;
return false
}if(this._playing){if(this._core.state.orientation!==k.orientation){this._core.state.orientation=k.orientation;
return false
}}return true
};
f.prototype.destroy=function(){var b,a;
this._core.$element.off("click.c16.video");
for(b in this._handlers){this._core.$element.off(b,this._handlers[b])
}for(a in Object.getOwnPropertyNames(this)){typeof this[a]!="function"&&(this[a]=null)
}};
j.fn.c16Carousel.Constructor.Plugins.Video=f
})(window.Zepto||window.jQuery,window,document);
(function(j,k,f,h){var g=function(a){this.core=a;
this.core.options=j.extend({},g.Defaults,this.core.options);
this.swapping=true;
this.previous=h;
this.next=h;
this.handlers={"change.c16.carousel":j.proxy(function(b){if(b.property.name=="position"){this.previous=this.core.current();
this.next=b.property.value
}},this),"drag.c16.carousel dragged.c16.carousel translated.c16.carousel":j.proxy(function(b){this.swapping=b.type=="translated"
},this),"translate.c16.carousel":j.proxy(function(b){if(this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)){this.swap()
}},this)};
this.core.$element.on(this.handlers)
};
g.Defaults={animateOut:false,animateIn:false};
g.prototype.swap=function(){if(this.core.settings.items!==1||!this.core.support3d){return
}this.core.speed(0);
var a,l=j.proxy(this.clear,this),b=this.core.$stage.children().eq(this.previous),c=this.core.$stage.children().eq(this.next),e=this.core.settings.animateIn,d=this.core.settings.animateOut;
if(this.core.current()===this.previous){return
}if(d){a=this.core.coordinates(this.previous)-this.core.coordinates(this.next);
b.css({left:a+"px"}).addClass("animated c16-animated-out").addClass(d).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",l)
}if(e){c.addClass("animated c16-animated-in").addClass(e).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",l)
}};
g.prototype.clear=function(a){j(a.target).css({left:""}).removeClass("animated c16-animated-out c16-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut);
this.core.transitionEnd()
};
g.prototype.destroy=function(){var b,a;
for(b in this.handlers){this.core.$element.off(b,this.handlers[b])
}for(a in Object.getOwnPropertyNames(this)){typeof this[a]!="function"&&(this[a]=null)
}};
j.fn.c16Carousel.Constructor.Plugins.Animate=g
})(window.Zepto||window.jQuery,window,document);
(function(k,f,g,h){var j=function(a){this.core=a;
this.core.options=k.extend({},j.Defaults,this.core.options);
this.handlers={"translated.c16.carousel refreshed.c16.carousel":k.proxy(function(){this.autoplay()
},this),"play.c16.autoplay":k.proxy(function(b,d,c){this.play(d,c)
},this),"stop.c16.autoplay":k.proxy(function(){this.stop()
},this),"mouseover.c16.autoplay":k.proxy(function(){if(this.core.settings.autoplayHoverPause){this.pause()
}},this),"mouseleave.c16.autoplay":k.proxy(function(){if(this.core.settings.autoplayHoverPause){this.autoplay()
}},this)};
this.core.$element.on(this.handlers)
};
j.Defaults={autoplay:false,autoplayTimeout:5000,autoplayHoverPause:false,autoplaySpeed:false};
j.prototype.autoplay=function(){if(this.core.settings.autoplay&&!this.core.state.videoPlay){f.clearInterval(this.interval);
this.interval=f.setInterval(k.proxy(function(){this.play()
},this),this.core.settings.autoplayTimeout)
}else{f.clearInterval(this.interval)
}};
j.prototype.play=function(a,b){if(g.hidden===true){return
}if(this.core.state.isTouch||this.core.state.isScrolling||this.core.state.isSwiping||this.core.state.inMotion){return
}if(this.core.settings.autoplay===false){f.clearInterval(this.interval);
return
}this.core.next(this.core.settings.autoplaySpeed)
};
j.prototype.stop=function(){f.clearInterval(this.interval)
};
j.prototype.pause=function(){f.clearInterval(this.interval)
};
j.prototype.destroy=function(){var b,a;
f.clearInterval(this.interval);
for(b in this.handlers){this.core.$element.off(b,this.handlers[b])
}for(a in Object.getOwnPropertyNames(this)){typeof this[a]!="function"&&(this[a]=null)
}};
k.fn.c16Carousel.Constructor.Plugins.autoplay=j
})(window.Zepto||window.jQuery,window,document);
(function(j,f,g,h){var k=function(a){this._core=a;
this._initialized=false;
this._pages=[];
this._controls={};
this._templates=[];
this.$element=this._core.$element;
this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to};
this._handlers={"prepared.c16.carousel":j.proxy(function(b){if(this._core.settings.dotsData){this._templates.push(j(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
}},this),"add.c16.carousel":j.proxy(function(b){if(this._core.settings.dotsData){this._templates.splice(b.position,0,j(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
}},this),"remove.c16.carousel prepared.c16.carousel":j.proxy(function(b){if(this._core.settings.dotsData){this._templates.splice(b.position,1)
}},this),"change.c16.carousel":j.proxy(function(c){if(c.property.name=="position"){if(!this._core.state.revert&&!this._core.settings.loop&&this._core.settings.navRewind){var d=this._core.current(),b=this._core.maximum(),e=this._core.minimum();
c.data=c.property.value>b?d>=b?e:b:c.property.value<e?b:c.property.value
}}},this),"changed.c16.carousel":j.proxy(function(b){if(b.property.name=="position"){this.draw()
}},this),"refreshed.c16.carousel":j.proxy(function(){if(!this._initialized){this.initialize();
this._initialized=true
}this._core.trigger("refresh",null,"navigation");
this.update();
this.draw();
this._core.trigger("refreshed",null,"navigation")
},this)};
this._core.options=j.extend({},k.Defaults,this._core.options);
this.$element.on(this._handlers)
};
k.Defaults={nav:false,navRewind:true,navText:['<span class="ficon ficon-arrow-left"></span>','<span class="ficon ficon-arrow-right"></span>'],navSpeed:false,navElement:"div",navContainer:false,navContainerClass:"c16-nav",navClass:["c16-prev","c16-next"],slideBy:1,dotClass:"c16-dot",dotsClass:"c16-dots",dots:true,dotsEach:false,dotData:false,dotsSpeed:false,dotsContainer:false,controlsClass:"c16-controls"};
k.prototype.initialize=function(){var a,b,c=this._core.settings;
if(!c.dotsData){this._templates=[j("<div>").addClass(c.dotClass).append(j("<span>")).prop("outerHTML")]
}if(!c.navContainer||!c.dotsContainer){this._controls.$container=j("<div>").addClass(c.controlsClass).appendTo(this.$element)
}this._controls.$indicators=c.dotsContainer?j(c.dotsContainer):j("<div>").hide().addClass(c.dotsClass).appendTo(this._controls.$container);
this._controls.$indicators.on("click","div",j.proxy(function(d){var e=j(d.target).parent().is(this._controls.$indicators)?j(d.target).index():j(d.target).parent().index();
d.preventDefault();
this.to(e,c.dotsSpeed)
},this));
a=c.navContainer?j(c.navContainer):j("<div>").addClass(c.navContainerClass).prependTo(this._controls.$container);
this._controls.$next=j("<"+c.navElement+">");
this._controls.$previous=this._controls.$next.clone();
this._controls.$previous.addClass(c.navClass[0]).html(c.navText[0]).hide().prependTo(a).on("click",j.proxy(function(d){this.prev(c.navSpeed)
},this));
this._controls.$next.addClass(c.navClass[1]).html(c.navText[1]).hide().appendTo(a).on("click",j.proxy(function(d){this.next(c.navSpeed)
},this));
for(b in this._overrides){this._core[b]=j.proxy(this[b],this)
}};
k.prototype.destroy=function(){var c,a,b,d;
for(c in this._handlers){this.$element.off(c,this._handlers[c])
}for(a in this._controls){this._controls[a].remove()
}for(d in this.overides){this._core[d]=this._overrides[d]
}for(b in Object.getOwnPropertyNames(this)){typeof this[b]!="function"&&(this[b]=null)
}};
k.prototype.update=function(){var q,b,e,c=this._core.settings,d=this._core.clones().length/2,p=d+this._core.items().length,a=c.center||c.autoWidth||c.dotData?1:c.dotsEach||c.items;
if(c.slideBy!=="page"){c.slideBy=Math.min(c.slideBy,c.items)
}if(c.dots||c.slideBy=="page"){this._pages=[];
for(q=d,b=0,e=0;
q<p;
q++){if(b>=a||b===0){this._pages.push({start:q-d,end:q-d+a-1});
b=0,++e
}b+=this._core.mergers(this._core.relative(q))
}}};
k.prototype.draw=function(){var a,c,d="",e=this._core.settings,b=this._core.$stage.children(),m=this._core.relative(this._core.current());
if(e.nav&&!e.loop&&!e.navRewind){this._controls.$previous.toggleClass("disabled",m<=0);
this._controls.$next.toggleClass("disabled",m>=this._core.maximum())
}this._controls.$previous.toggle(e.nav);
this._controls.$next.toggle(e.nav);
if(e.dots){a=this._pages.length-this._controls.$indicators.children().length;
if(e.dotData&&a!==0){for(c=0;
c<this._controls.$indicators.children().length;
c++){d+=this._templates[this._core.relative(c)]
}this._controls.$indicators.html(d)
}else{if(a>0){d=new Array(a+1).join(this._templates[0]);
this._controls.$indicators.append(d)
}else{if(a<0){this._controls.$indicators.children().slice(a).remove()
}}}this._controls.$indicators.find(".active").removeClass("active");
this._controls.$indicators.children().eq(j.inArray(this.current(),this._pages)).addClass("active")
}this._controls.$indicators.toggle(e.dots)
};
k.prototype.onTrigger=function(a){var b=this._core.settings;
a.page={index:j.inArray(this.current(),this._pages),count:this._pages.length,size:b&&(b.center||b.autoWidth||b.dotData?1:b.dotsEach||b.items)}
};
k.prototype.current=function(){var a=this._core.relative(this._core.current());
return j.grep(this._pages,function(b){return b.start<=a&&b.end>=a
}).pop()
};
k.prototype.getPosition=function(c){var d,a,b=this._core.settings;
if(b.slideBy=="page"){d=j.inArray(this.current(),this._pages);
a=this._pages.length;
c?++d:--d;
d=this._pages[((d%a)+a)%a].start
}else{d=this._core.relative(this._core.current());
a=this._core.items().length;
c?d+=b.slideBy:d-=b.slideBy
}return d
};
k.prototype.next=function(a){j.proxy(this._overrides.to,this._core)(this.getPosition(true),a)
};
k.prototype.prev=function(a){j.proxy(this._overrides.to,this._core)(this.getPosition(false),a)
};
k.prototype.to=function(d,a,c){var b;
if(!c){b=this._pages.length;
j.proxy(this._overrides.to,this._core)(this._pages[((d%b)+b)%b].start,a)
}else{j.proxy(this._overrides.to,this._core)(d,a)
}};
j.fn.c16Carousel.Constructor.Plugins.Navigation=k
})(window.Zepto||window.jQuery,window,document);
(function(j,k,g,h){var f=function(a){this._core=a;
this._hashes={};
this.$element=this._core.$element;
this._handlers={"initialized.c16.carousel":j.proxy(function(){if(this._core.settings.startPosition=="URLHash"){j(k).trigger("hashchange.c16.navigation")
}},this),"prepared.c16.carousel":j.proxy(function(b){var c=j(b.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
this._hashes[c]=b.content
},this)};
this._core.options=j.extend({},f.Defaults,this._core.options);
this.$element.on(this._handlers);
j(k).on("hashchange.c16.navigation",j.proxy(function(){var b=k.location.hash.substring(1),c=this._core.$stage.children(),d=this._hashes[b]&&c.index(this._hashes[b])||0;
if(!b){return false
}this._core.to(d,false,true)
},this))
};
f.Defaults={URLhashListener:false};
f.prototype.destroy=function(){var b,a;
j(k).off("hashchange.c16.navigation");
for(b in this._handlers){this._core.$element.off(b,this._handlers[b])
}for(a in Object.getOwnPropertyNames(this)){typeof this[a]!="function"&&(this[a]=null)
}};
j.fn.c16Carousel.Constructor.Plugins.Hash=f
})(window.Zepto||window.jQuery,window,document);
/*!
 * c16 Content Carousel - init
 * Version: 1.1
 */
;
fdc.c16=fdc.c16||{};
fdc.c16.init=function(o){var k=o.data("c16Carousel").options.dotClass,j=o.data("c16Carousel").options.dotsEach,l=o.data("c16Carousel").options.activeClass,r=o.data("c16Carousel").options.navClass[0],p=o.data("c16Carousel").options.navClass[1],n=o.find("."+r),m=o.find("."+p);
loop=o.data("c16Carousel").options.loop;
function q(b){var a=o.data("c16Carousel").settings.items;
var c=o.find("."+k).show();
if(j){c.removeClass(l);
for(var d=0;
d<a;
d++){c.eq(b.page.index+d).addClass(l)
}}if(b.page.index==0&&!loop){n.hide()
}if(b.page.index==(c.length-(j?a:1))){if(!loop){m.hide()
}if(b.page.index==0){c.hide()
}}if(!j&&b.item.index+b.page.size>=b.item.count){m.hide();
if(b.page.count!==1){n.show().one("click",function(){o.data("c16Carousel").to(b.page.count-2)
})
}c.removeClass(l).last().addClass(l)
}}o.on("changed.c16.carousel",q);
o.on("resized.c16.carousel",q);
q({page:{index:0},item:{count:0}});
o.find(".c11v6 .c11v6-container").equalHeight();
o.find(".c11v4 .c11v4-container").css("height","auto");
o.find(".c11v4 .c11v4-container").equalHeight();
$(window).resize(function(){o.find(".c11v6 .c11v6-container").css("height","auto");
o.find(".c11v6 .c11v6-container").equalHeight();
o.find(".c11v4 .c11v4-container").css("height","auto");
o.find(".c11v4 .c11v4-container").equalHeight()
})
};
/*!
 * n01 Call to Action Bar
 * Version: 1.0
 */
;
function fixCta(){if(jQuery("#n01-position").length>0){var b=($("#hp").outerHeight()+$("#np").outerHeight());
var a=(jQuery("#n01-position").offset().top+jQuery("#n01-position").outerHeight())-jQuery(window).scrollTop();
if(a<=b){jQuery("#n01-target").addClass("is-fixed")
}else{jQuery("#n01-target").removeClass("is-fixed")
}}}$(document).scroll(function(){fixCta()
});
/*!
 * n03 Mega Menu
 * Version: 1.0
 */
;
function showNav(e,h){h.preventDefault();
var g=jQuery(e);
var f=jQuery(g.attr("href"));
g.toggleClass("is-toggled");
f.toggleClass("is-visible");
jQuery(".n03").toggleClass("is-toggled");
jQuery("html,body").animate({scrollTop:0},200)
}function showNavSub(m,l){var k=jQuery(m);
var h=k.closest(".n03_list-item");
var j=h.siblings(".n03_list-item");
var e=h.find(".n03_list-item-sub");
j.find(".n03_list-item-sub").removeClass("is-visible");
j.find(".n03_list-item-sub_show").removeClass("is-toggled");
k.toggleClass("is-toggled");
e.toggleClass("is-visible")
}function showNavMore(k,j){var h=jQuery(k);
var g=h.closest(".n03_nav");
var e=g.find(".n03_nav-secondary");
e.toggleClass("is-visible")
}function initNav(){jQuery("body").on("click",'[data-behavior~="show-nav"]',function(b){showNav(this,b)
});
jQuery("body").on("click",'[data-behavior~="show-nav-sub"]',function(b){showNavSub(this,b)
});
jQuery("body").on("click",'[data-behavior~="show-nav-more"]',function(b){showNavMore(this,b)
})
}initNav();
/*!
 * uc-he01 Hero Carousel
 * Version: 1.2.2
 */
;
var i=1,totalSlides=$("#uc-he01_carousel .uc-he01_sc_s").length;
function changeSlide(a){$("#uc-he01_carousel").removeClass("uc-he01_s-1 uc-he01_s-2 uc-he01_s-3 uc-he01_s-4 uc-he01_s-5");
$(".uc-he01_sc_s, .uc-he01_c_btn").removeClass("is-active");
$("#uc-he01_sc_s-"+(a)+', [data-target="'+(a)+'"]').addClass("is-active animate");
window.setTimeout(function(){$(".uc-he01_sc_s, .uc-he01_c_btn").not("#uc-he01_sc_s-"+(a)).removeClass("animate")
},1000);
$("#uc-he01_carousel").addClass("uc-he01_s-"+(a))
}function initCarousel(){$("#uc-he01_sc_s-1").addClass("animate");
$("body").on("click",'[data-behavior~="change-slide"]:not(.is-active)',function(a){a.preventDefault();
i=$(this).data("target");
changeSlide(i)
})
}function msieversion(){var b=window.navigator.userAgent;
var a=b.indexOf("MSIE ");
if(a>0){return parseInt(b.substring(a+5,b.indexOf(".",a)))
}else{return 0
}}if(msieversion()===8){function startTimer(){++i;
if(i>=totalSlides+1){i=1
}changeSlide(i)
}var intervalId=setInterval(startTimer,4000);
$(document).on("mouseover",".uc-he01_s",function(){clearInterval(intervalId)
});
$(document).on("mouseleave",".uc-he01_s",function(){intervalId=setInterval(startTimer,4000)
})
}else{if(window.location.search.indexOf("autorotate=false")<0){$(".uc-he01_c_w").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",function(){++i;
if(i>=totalSlides+1){i=1
}changeSlide(i)
})
}$(document).on("mouseover",".uc-he01_s, .uc-he01_c_btn.is-active",function(c){var a=$(".uc-he01").position(),b=(c.pageX>a.left&&c.pageX<a.left+$(".uc-he01").width()),d=(c.pageY>a.top&&c.pageY<a.top+$(".uc-he01").height());
if(b&&d){$(".uc-he01_c_btn.is-active").addClass("is-paused")
}});
$(document).on("mouseleave",".uc-he01_s, .uc-he01_c_btn.is-active",function(){$(".uc-he01_c_btn").removeClass("is-paused")
})
}initCarousel();
$(function(){History.Adapter.bind(window,"statechange",function(){var c=History.getState();
var b=$(".searchResults").attr("data-ajaxurl")+".html";
var d;
if(c.cleanUrl.indexOf("?")!=-1){d=c.cleanUrl.substring(c.cleanUrl.indexOf("?"));
b+=d;
$(".searchResults").removeClass("errored").addClass("loading");
$.ajax({url:b}).done(function(f){var e=$("<div></div>");
e.html(f);
$(".searchResults").html(e.find(".searchResults").html());
$(".searchResults").removeClass("loading");
window.scrollTo(0,0)
}).fail(function(){$(".searchResults").removeClass("loading").addClass("errored")
})
}});
$(document).on("click",".ajaxlink",function(c){c.preventDefault();
var b=$(c.target).attr("href");
var d;
if(b.indexOf("?")!=-1){d=b.substring(b.indexOf("?"));
History.pushState(null,null,d)
}});
$(document).on("change",".ajaxselect",function(c){c.preventDefault();
var b=$(c.target).find(":selected").each(function(){var e;
var d=$(this).attr("href");
if(d.indexOf("?")!=-1){e=d.substring(d.indexOf("?"));
History.pushState(null,null,e)
}})
});
var a=-1;
$(document).on("keyup","input[name='q']",function(d){var e=$(this);
if(d.which==13){}else{if(d.which==27){$("#searchsuggestions").hide();
$("#searchboxsuggestions").hide()
}else{if(d.which==38||d.which==40){$("#searchsuggestions").show();
var c=$("li.liSuggest").length;
$("li.liSuggest").each(function(f){if($(this).hasClass("selected")){if(d.which==38){a=f-1<0?-1:f-1;
$(this).removeClass("selected");
$(this).prev().addClass("selected");
var g=$(this).prev().text();
$(e).val(g);
return false
}else{if(d.which==40){a=f+1>c-1?-1:f+1;
$(this).removeClass("selected");
$(this).next().addClass("selected");
var g=$(this).next().text();
$(e).val(g);
return false
}}}else{if(d.which==40&&f==0&&a==-1){a=f;
$(this).addClass("selected");
var g=$(this).text();
$(e).val(g)
}else{if(d.which==38&&f==c-1&&a==-1){a=f;
$(this).addClass("selected");
var g=$(this).text();
$(e).val(g)
}else{if(a==-1){}}}}})
}else{var b=$(this).attr("data-locale");
if(b==="en_US"){a=-1;
$("#searchsuggestions").show();
$("#searchboxsuggestions").show();
showSuggestions($(this))
}}}}});
$(document).on("mouseenter","li.liSuggest",function(){$(this).addClass("selected")
});
$(document).on("mouseleave","li.liSuggest",function(){a=-1;
$(this).removeClass("selected")
});
$(document).on("keyup","li.liSuggest",function(c){if(c.which==38||c.which==40){var b=$(this).val();
document.getElementById("q").value=b
}});
$(document).click(function(){$("#searchsuggestions").empty();
$("#searchsuggestions").hide();
$("#searchboxsuggestions").empty();
$("#header-search").find("form:first").find("input:text").val("");
$("#searchboxsuggestions").hide()
});
$("input[name='q']").click(function(b){b.stopPropagation()
});
$("input[name='q']").each(function(){if($(this).attr("data-locale")===undefined){var b=$("html").attr("lang")===undefined?"":$("html").attr("lang").replace("-","_");
$(this).attr("data-locale",b)
}});
$("body").on("click",".liSuggest",function(){$(this).parent("ul").parent("div").prev("input").val(encodeURIComponent($(this).text()));
$(this).parent("ul").parent("div").closest("form").submit()
})
});
function showSuggestions(c){var d="";
var f=$(c).val();
var a=$(c).attr("data-locale");
if(f.length==0){$(c).next("div").html("");
return
}f=f.replace(/\s+/g," ").trim();
var b=f.split(" ");
var e="";
if(b.length>1){e=b[b.length-1];
f=f.replace(" ","+")
}if(window.XMLHttpRequest){xmlhttp=new XMLHttpRequest()
}else{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
}xmlhttp.onreadystatechange=function(){if(this.readyState==4&&this.status==200&&this.responseText!="No Results"){var j=this.responseText.split(",");
for(var h=0;
h<=j.length-1;
h++){d=d+"<li class='liSuggest' onclick=''>"+j[h]+"</li>"
}var g="<ul class='ulSuggest' style='list-style-type:none'>"+d+"</ul>";
$(c).next("div").html(g)
}};
xmlhttp.open("GET","/apps/search/searchSuggestServlet?q="+f+"&xhr="+e+"&locale="+a,true);
xmlhttp.send()
}$(document).ready(function(){$(window).keydown(function(b){if(b.keyCode==13){var a=$(".search-field_text").val();
if(a===""||a.length===0){b.preventDefault();
return false
}}})
});
$(function(){$("#advSearchForm").on("submit",function(d){d.preventDefault();
var c="?q="+$("input[name='allWords'").val().replace(/\s+/g,"AND");
var b;
console.log("query first field pass = ",c);
c+=' "'+$("input[name='thisExactPhrase'").val()+'"';
console.log("query second field pass = ",c);
c+=" "+$("input[name='atLeastOneOfTheseWords'").val().replace(/\s+/g,"OR");
console.log("query third field pass = ",c);
b=$("input[name='withoutTheseWords'").val().match(/\S+/g);
console.log("negs=",b);
for(var a=0;
a<b.length;
a++){c+=" -"+b[a]
}console.log("query fourth field pass = ",c)
})
});
typeof JSON!="object"&&(JSON={}),function(){function f(e){return e<10?"0"+e:e
}function quote(e){return escapable.lastIndex=0,escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];
return typeof t=="string"?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)
})+'"':'"'+e+'"'
}function str(e,t){var n,r,i,s,o=gap,u,a=t[e];
a&&typeof a=="object"&&typeof a.toJSON=="function"&&(a=a.toJSON(e)),typeof rep=="function"&&(a=rep.call(t,e,a));
switch(typeof a){case"string":return quote(a);
case"number":return isFinite(a)?String(a):"null";
case"boolean":case"null":return String(a);
case"object":if(!a){return"null"
}gap+=indent,u=[];
if(Object.prototype.toString.apply(a)==="[object Array]"){s=a.length;
for(n=0;
n<s;
n+=1){u[n]=str(n,a)||"null"
}return i=u.length===0?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+o+"]":"["+u.join(",")+"]",gap=o,i
}if(rep&&typeof rep=="object"){s=rep.length;
for(n=0;
n<s;
n+=1){typeof rep[n]=="string"&&(r=rep[n],i=str(r,a),i&&u.push(quote(r)+(gap?": ":":")+i))
}}else{for(r in a){Object.prototype.hasOwnProperty.call(a,r)&&(i=str(r,a),i&&u.push(quote(r)+(gap?": ":":")+i))
}}return i=u.length===0?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+o+"}":"{"+u.join(",")+"}",gap=o,i
}}typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(e){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null
},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(e){return this.valueOf()
});
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","  ":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;
typeof JSON.stringify!="function"&&(JSON.stringify=function(e,t,n){var r;
gap="",indent="";
if(typeof n=="number"){for(r=0;
r<n;
r+=1){indent+=" "
}}else{typeof n=="string"&&(indent=n)
}rep=t;
if(!t||typeof t=="function"||typeof t=="object"&&typeof t.length=="number"){return str("",{"":e})
}throw new Error("JSON.stringify")
}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(e,t){var n,r,i=e[t];
if(i&&typeof i=="object"){for(n in i){Object.prototype.hasOwnProperty.call(i,n)&&(r=walk(i,n),r!==undefined?i[n]=r:delete i[n])
}}return reviver.call(e,t,i)
}var j;
text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)
}));
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j
}throw new SyntaxError("JSON.parse")
})
}(),function(c,a){var d=c.History=c.History||{},b=c.jQuery;
if(typeof d.Adapter!="undefined"){throw new Error("History.js Adapter has already been loaded...")
}d.Adapter={bind:function(g,f,h){b(g).bind(f,h)
},trigger:function(g,f,h){b(g).trigger(f,h)
},extractEventData:function(h,j,g){var f=j&&j.originalEvent&&j.originalEvent[h]||g&&g[h]||a;
return f
},onDomLoad:function(f){b(f)
}},typeof d.init!="undefined"&&d.init()
}(window),function(f,b){var h=f.document,d=f.setTimeout||d,a=f.clearTimeout||a,c=f.setInterval||c,g=f.History=f.History||{};
if(typeof g.initHtml4!="undefined"){throw new Error("History.js HTML4 Support has already been loaded...")
}g.initHtml4=function(){if(typeof g.initHtml4.initialized!="undefined"){return !1
}g.initHtml4.initialized=!0,g.enabled=!0,g.savedHashes=[],g.isLastHash=function(k){var j=g.getHashByIndex(),l;
return l=k===j,l
},g.isHashEqual=function(k,j){return k=encodeURIComponent(k).replace(/%25/g,"%"),j=encodeURIComponent(j).replace(/%25/g,"%"),k===j
},g.saveHash=function(j){return g.isLastHash(j)?!1:(g.savedHashes.push(j),!0)
},g.getHashByIndex=function(k){var j=null;
return typeof k=="undefined"?j=g.savedHashes[g.savedHashes.length-1]:k<0?j=g.savedHashes[g.savedHashes.length+k]:j=g.savedHashes[k],j
},g.discardedHashes={},g.discardedStates={},g.discardState=function(m,k,o){var l=g.getHashByState(m),j;
return j={discardedState:m,backState:o,forwardState:k},g.discardedStates[l]=j,!0
},g.discardHash=function(l,j,m){var k={discardedHash:l,backState:m,forwardState:j};
return g.discardedHashes[l]=k,!0
},g.discardedState=function(k){var j=g.getHashByState(k),l;
return l=g.discardedStates[j]||!1,l
},g.discardedHash=function(k){var j=g.discardedHashes[k]||!1;
return j
},g.recycleState=function(k){var j=g.getHashByState(k);
return g.discardedState(k)&&delete g.discardedStates[j],!0
},g.emulated.hashChange&&(g.hashChangeInit=function(){g.checkerFunction=null;
var l="",m,k,j,e,n=Boolean(g.getHash());
return g.isInternetExplorer()?(m="historyjs-iframe",k=h.createElement("iframe"),k.setAttribute("id",m),k.setAttribute("src","#"),k.style.display="none",h.body.appendChild(k),k.contentWindow.document.open(),k.contentWindow.document.close(),j="",e=!1,g.checkerFunction=function(){if(e){return !1
}e=!0;
var p=g.getHash(),o=g.getHash(k.contentWindow.document);
return p!==l?(l=p,o!==p&&(j=o=p,k.contentWindow.document.open(),k.contentWindow.document.close(),k.contentWindow.document.location.hash=g.escapeHash(p)),g.Adapter.trigger(f,"hashchange")):o!==j&&(j=o,n&&o===""?g.back():g.setHash(o,!1)),e=!1,!0
}):g.checkerFunction=function(){var o=g.getHash()||"";
return o!==l&&(l=o,g.Adapter.trigger(f,"hashchange")),!0
},g.intervalList.push(c(g.checkerFunction,g.options.hashChangeInterval)),!0
},g.Adapter.onDomLoad(g.hashChangeInit)),g.emulated.pushState&&(g.onHashChange=function(l){var p=l&&l.newURL||g.getLocationHref(),o=g.getHashByUrl(p),k=null,m=null,j=null,e;
return g.isLastHash(o)?(g.busy(!1),!1):(g.doubleCheckComplete(),g.saveHash(o),o&&g.isTraditionalAnchor(o)?(g.Adapter.trigger(f,"anchorchange"),g.busy(!1),!1):(k=g.extractState(g.getFullUrl(o||g.getLocationHref()),!0),g.isLastSavedState(k)?(g.busy(!1),!1):(m=g.getHashByState(k),e=g.discardedState(k),e?(g.getHashByIndex(-2)===g.getHashByState(e.forwardState)?g.back(!1):g.forward(!1),!1):(g.pushState(k.data,k.title,encodeURI(k.url),!1),!0))))
},g.Adapter.bind(f,"hashchange",g.onHashChange),g.pushState=function(w,j,e,m){e=encodeURI(e).replace(/%25/g,"%");
if(g.getHashByUrl(e)){throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).")
}if(m!==!1&&g.busy()){return g.pushQueue({scope:g,callback:g.pushState,args:arguments,queue:m}),!1
}g.busy(!0);
var x=g.createStateObject(w,j,e),v=g.getHashByState(x),q=g.getState(!1),o=g.getHashByState(q),k=g.getHash(),p=g.expectedStateId==x.id;
return g.storeState(x),g.expectedStateId=x.id,g.recycleState(x),g.setTitle(x),v===o?(g.busy(!1),!1):(g.saveState(x),p||g.Adapter.trigger(f,"statechange"),!g.isHashEqual(v,k)&&!g.isHashEqual(v,g.getShortUrl(g.getLocationHref()))&&g.setHash(v,!1),g.busy(!1),!0)
},g.replaceState=function(v,j,e,m){e=encodeURI(e).replace(/%25/g,"%");
if(g.getHashByUrl(e)){throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).")
}if(m!==!1&&g.busy()){return g.pushQueue({scope:g,callback:g.replaceState,args:arguments,queue:m}),!1
}g.busy(!0);
var w=g.createStateObject(v,j,e),q=g.getHashByState(w),p=g.getState(!1),o=g.getHashByState(p),k=g.getStateByIndex(-2);
return g.discardState(p,w,k),q===o?(g.storeState(w),g.expectedStateId=w.id,g.recycleState(w),g.setTitle(w),g.saveState(w),g.Adapter.trigger(f,"statechange"),g.busy(!1)):g.pushState(w.data,w.title,w.url,!1),!0
}),g.emulated.pushState&&g.getHash()&&!g.emulated.hashChange&&g.Adapter.onDomLoad(function(){g.Adapter.trigger(f,"hashchange")
})
},typeof g.init!="undefined"&&g.init()
}(window),function(x,C){var k=x.console||C,b=x.document,q=x.navigator,D=!1,j=x.setTimeout,B=x.clearTimeout,A=x.setInterval,w=x.clearInterval,m=x.JSON,z=x.alert,v=x.History=x.History||{},g=x.history;
try{D=x.sessionStorage,D.setItem("TEST","1"),D.removeItem("TEST")
}catch(y){D=!1
}m.stringify=m.stringify||m.encode,m.parse=m.parse||m.decode;
if(typeof v.init!="undefined"){throw new Error("History.js Core has already been loaded...")
}v.init=function(a){return typeof v.Adapter=="undefined"?!1:(typeof v.initCore!="undefined"&&v.initCore(),typeof v.initHtml4!="undefined"&&v.initHtml4(),!0)
},v.initCore=function(e){if(typeof v.initCore.initialized!="undefined"){return !1
}v.initCore.initialized=!0,v.options=v.options||{},v.options.hashChangeInterval=v.options.hashChangeInterval||100,v.options.safariPollInterval=v.options.safariPollInterval||500,v.options.doubleCheckInterval=v.options.doubleCheckInterval||500,v.options.disableSuid=v.options.disableSuid||!1,v.options.storeInterval=v.options.storeInterval||1000,v.options.busyDelay=v.options.busyDelay||250,v.options.debug=v.options.debug||!1,v.options.initialTitle=v.options.initialTitle||b.title,v.options.html4Mode=v.options.html4Mode||!1,v.options.delayInit=v.options.delayInit||!1,v.intervalList=[],v.clearAllIntervals=function(){var f,d=v.intervalList;
if(typeof d!="undefined"&&d!==null){for(f=0;
f<d.length;
f++){w(d[f])
}v.intervalList=null
}},v.debug=function(){(v.options.debug||!1)&&v.log.apply(v,arguments)
},v.log=function(){var E=typeof k!="undefined"&&typeof k.log!="undefined"&&typeof k.log.apply!="undefined",n=b.getElementById("log"),l,p,F,h,d;
E?(h=Array.prototype.slice.call(arguments),l=h.shift(),typeof k.debug!="undefined"?k.debug.apply(k,[l,h]):k.log.apply(k,[l,h])):l="\n"+arguments[0]+"\n";
for(p=1,F=arguments.length;
p<F;
++p){d=arguments[p];
if(typeof d=="object"&&typeof m!="undefined"){try{d=m.stringify(d)
}catch(r){}}l+="\n"+d+"\n"
}return n?(n.value+=l+"\n-----\n",n.scrollTop=n.scrollHeight-n.clientHeight):E||z(l),!0
},v.getInternetExplorerMajorVersion=function(){var d=v.getInternetExplorerMajorVersion.cached=typeof v.getInternetExplorerMajorVersion.cached!="undefined"?v.getInternetExplorerMajorVersion.cached:function(){var h=3,f=b.createElement("div"),l=f.getElementsByTagName("i");
while((f.innerHTML="<!--[if gt IE "+ ++h+"]><i></i><![endif]-->")&&l[0]){}return h>4?h:!1
}();
return d
},v.isInternetExplorer=function(){var d=v.isInternetExplorer.cached=typeof v.isInternetExplorer.cached!="undefined"?v.isInternetExplorer.cached:Boolean(v.getInternetExplorerMajorVersion());
return d
},v.options.html4Mode?v.emulated={pushState:!0,hashChange:!0}:v.emulated={pushState:!Boolean(x.history&&x.history.pushState&&x.history.replaceState&&!/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(q.userAgent)&&!/AppleWebKit\/5([0-2]|3[0-2])/i.test(q.userAgent)),hashChange:Boolean(!("onhashchange" in x||"onhashchange" in b)||v.isInternetExplorer()&&v.getInternetExplorerMajorVersion()<8)},v.enabled=!v.emulated.pushState,v.bugs={setHash:Boolean(!v.emulated.pushState&&q.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(q.userAgent)),safariPoll:Boolean(!v.emulated.pushState&&q.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(q.userAgent)),ieDoubleCheck:Boolean(v.isInternetExplorer()&&v.getInternetExplorerMajorVersion()<8),hashEscape:Boolean(v.isInternetExplorer()&&v.getInternetExplorerMajorVersion()<7)},v.isEmptyObject=function(f){for(var d in f){if(f.hasOwnProperty(d)){return !1
}}return !0
},v.cloneObject=function(f){var d,h;
return f?(d=m.stringify(f),h=m.parse(d)):h={},h
},v.getRootUrl=function(){var d=b.location.protocol+"//"+(b.location.hostname||b.location.host);
if(b.location.port||!1){d+=":"+b.location.port
}return d+="/",d
},v.getBaseHref=function(){var f=b.getElementsByTagName("base"),d=null,h="";
return f.length===1&&(d=f[0],h=d.href.replace(/[^\/]+$/,"")),h=h.replace(/\/+$/,""),h&&(h+="/"),h
},v.getBaseUrl=function(){var d=v.getBaseHref()||v.getBasePageUrl()||v.getRootUrl();
return d
},v.getPageUrl=function(){var f=v.getState(!1,!1),d=(f||{}).url||v.getLocationHref(),h;
return h=d.replace(/\/+$/,"").replace(/[^\/]+$/,function(o,l,p){return/\./.test(o)?o:o+"/"
}),h
},v.getBasePageUrl=function(){var d=v.getLocationHref().replace(/[#\?].*/,"").replace(/[^\/]+$/,function(h,f,l){return/[^\/]$/.test(h)?"":h
}).replace(/\/+$/,"")+"/";
return d
},v.getFullUrl=function(h,d){var l=h,f=h.substring(0,1);
return d=typeof d=="undefined"?!0:d,/[a-z]+\:\/\//.test(h)||(f==="/"?l=v.getRootUrl()+h.replace(/^\/+/,""):f==="#"?l=v.getPageUrl().replace(/#.*/,"")+h:f==="?"?l=v.getPageUrl().replace(/[\?#].*/,"")+h:d?l=v.getBaseUrl()+h.replace(/^(\.\/)+/,""):l=v.getBasePageUrl()+h.replace(/^(\.\/)+/,"")),l.replace(/\#$/,"")
},v.getShortUrl=function(h){var d=h,l=v.getBaseUrl(),f=v.getRootUrl();
return v.emulated.pushState&&(d=d.replace(l,"")),d=d.replace(f,"/"),v.isTraditionalAnchor(d)&&(d="./"+d),d=d.replace(/^(\.\/)+/g,"./").replace(/\#$/,""),d
},v.getLocationHref=function(d){return d=d||b,d.URL===d.location.href?d.location.href:d.location.href===decodeURIComponent(d.URL)?d.URL:d.location.hash&&decodeURIComponent(d.location.href.replace(/^[^#]+/,""))===d.location.hash?d.location.href:d.URL.indexOf("#")==-1&&d.location.href.indexOf("#")!=-1?d.location.href:d.URL||d.location.href
},v.store={},v.idToState=v.idToState||{},v.stateToId=v.stateToId||{},v.urlToId=v.urlToId||{},v.storedStates=v.storedStates||[],v.savedStates=v.savedStates||[],v.normalizeStore=function(){v.store.idToState=v.store.idToState||{},v.store.urlToId=v.store.urlToId||{},v.store.stateToId=v.store.stateToId||{}
},v.getState=function(f,d){typeof f=="undefined"&&(f=!0),typeof d=="undefined"&&(d=!0);
var h=v.getLastSavedState();
return !h&&d&&(h=v.createStateObject()),f&&(h=v.cloneObject(h),h.url=h.cleanUrl||h.url),h
},v.getIdByState=function(f){var d=v.extractId(f.url),h;
if(!d){h=v.getStateString(f);
if(typeof v.stateToId[h]!="undefined"){d=v.stateToId[h]
}else{if(typeof v.store.stateToId[h]!="undefined"){d=v.store.stateToId[h]
}else{for(;
;
){d=(new Date).getTime()+String(Math.random()).replace(/\D/g,"");
if(typeof v.idToState[d]=="undefined"&&typeof v.store.idToState[d]=="undefined"){break
}}v.stateToId[h]=d,v.idToState[d]=f
}}}return d
},v.normalizeState=function(f){var d,h;
if(!f||typeof f!="object"){f={}
}if(typeof f.normalized!="undefined"){return f
}if(!f.data||typeof f.data!="object"){f.data={}
}return d={},d.normalized=!0,d.title=f.title||"",d.url=v.getFullUrl(f.url?f.url:v.getLocationHref()),d.hash=v.getShortUrl(d.url),d.data=v.cloneObject(f.data),d.id=v.getIdByState(d),d.cleanUrl=d.url.replace(/\??\&_suid.*/,""),d.url=d.cleanUrl,h=!v.isEmptyObject(d.data),(d.title||h)&&v.options.disableSuid!==!0&&(d.hash=v.getShortUrl(d.url).replace(/\??\&_suid.*/,""),/\?/.test(d.hash)||(d.hash+="?"),d.hash+="&_suid="+d.id),d.hashedUrl=v.getFullUrl(d.hash),(v.emulated.pushState||v.bugs.safariPoll)&&v.hasUrlDuplicate(d)&&(d.url=d.hashedUrl),d
},v.createStateObject=function(h,d,l){var f={data:h,title:d,url:l};
return f=v.normalizeState(f),f
},v.getStateById=function(d){d=String(d);
var f=v.idToState[d]||v.store.idToState[d]||C;
return f
},v.getStateString=function(h){var d,l,f;
return d=v.normalizeState(h),l={data:d.data,title:h.title,url:h.url},f=m.stringify(l),f
},v.getStateId=function(f){var d,h;
return d=v.normalizeState(f),h=d.id,h
},v.getHashByState=function(f){var d,h;
return d=v.normalizeState(f),h=d.hash,h
},v.extractId=function(l){var f,o,h,d;
return l.indexOf("#")!=-1?d=l.split("#")[0]:d=l,o=/(.*)\&_suid=([0-9]+)$/.exec(d),h=o?o[1]||l:l,f=o?String(o[2]||""):"",f||!1
},v.isTraditionalAnchor=function(f){var d=!/[\/\?\.]/.test(f);
return d
},v.extractState=function(l,f){var o=null,h,d;
return f=f||!1,h=v.extractId(l),h&&(o=v.getStateById(h)),o||(d=v.getFullUrl(l),h=v.getIdByUrl(d)||!1,h&&(o=v.getStateById(h)),!o&&f&&!v.isTraditionalAnchor(l)&&(o=v.createStateObject(null,null,d))),o
},v.getIdByUrl=function(d){var f=v.urlToId[d]||v.store.urlToId[d]||C;
return f
},v.getLastSavedState=function(){return v.savedStates[v.savedStates.length-1]||C
},v.getLastStoredState=function(){return v.storedStates[v.storedStates.length-1]||C
},v.hasUrlDuplicate=function(f){var d=!1,h;
return h=v.extractState(f.url),d=h&&h.id!==f.id,d
},v.storeState=function(d){return v.urlToId[d.url]=d.id,v.storedStates.push(v.cloneObject(d)),d
},v.isLastSavedState=function(l){var f=!1,o,h,d;
return v.savedStates.length&&(o=l.id,h=v.getLastSavedState(),d=h.id,f=o===d),f
},v.saveState=function(d){return v.isLastSavedState(d)?!1:(v.savedStates.push(v.cloneObject(d)),!0)
},v.getStateByIndex=function(f){var d=null;
return typeof f=="undefined"?d=v.savedStates[v.savedStates.length-1]:f<0?d=v.savedStates[v.savedStates.length+f]:d=v.savedStates[f],d
},v.getCurrentIndex=function(){var d=null;
return v.savedStates.length<1?d=0:d=v.savedStates.length-1,d
},v.getHash=function(f){var d=v.getLocationHref(f),h;
return h=v.getHashByUrl(d),h
},v.unescapeHash=function(f){var d=v.normalizeHash(f);
return d=decodeURIComponent(d),d
},v.normalizeHash=function(f){var d=f.replace(/[^#]*#/,"").replace(/#.*/,"");
return d
},v.setHash=function(h,f){var l,d;
return f!==!1&&v.busy()?(v.pushQueue({scope:v,callback:v.setHash,args:arguments,queue:f}),!1):(v.busy(!0),l=v.extractState(h,!0),l&&!v.emulated.pushState?v.pushState(l.data,l.title,l.url,!1):v.getHash()!==h&&(v.bugs.setHash?(d=v.getPageUrl(),v.pushState(null,null,d+"#"+h,!1)):b.location.hash=h),v)
},v.escapeHash=function(d){var f=v.normalizeHash(d);
return f=x.encodeURIComponent(f),v.bugs.hashEscape||(f=f.replace(/\%21/g,"!").replace(/\%26/g,"&").replace(/\%3D/g,"=").replace(/\%3F/g,"?")),f
},v.getHashByUrl=function(f){var d=String(f).replace(/([^#]*)#?([^#]*)#?(.*)/,"$2");
return d=v.unescapeHash(d),d
},v.setTitle=function(h){var f=h.title,l;
f||(l=v.getStateByIndex(0),l&&l.url===h.url&&(f=l.title||v.options.initialTitle));
try{b.getElementsByTagName("title")[0].innerHTML=f.replace("<","&lt;").replace(">","&gt;").replace(" & "," &amp; ")
}catch(d){}return b.title=f,v
},v.queues=[],v.busy=function(f){typeof f!="undefined"?v.busy.flag=f:typeof v.busy.flag=="undefined"&&(v.busy.flag=!1);
if(!v.busy.flag){B(v.busy.timeout);
var d=function(){var l,o,h;
if(v.busy.flag){return
}for(l=v.queues.length-1;
l>=0;
--l){o=v.queues[l];
if(o.length===0){continue
}h=o.shift(),v.fireQueueItem(h),v.busy.timeout=j(d,v.options.busyDelay)
}};
v.busy.timeout=j(d,v.options.busyDelay)
}return v.busy.flag
},v.busy.flag=!1,v.fireQueueItem=function(d){return d.callback.apply(d.scope||v,d.args||[])
},v.pushQueue=function(d){return v.queues[d.queue||0]=v.queues[d.queue||0]||[],v.queues[d.queue||0].push(d),v
},v.queue=function(f,d){return typeof f=="function"&&(f={callback:f}),typeof d!="undefined"&&(f.queue=d),v.busy()?v.pushQueue(f):v.fireQueueItem(f),v
},v.clearQueue=function(){return v.busy.flag=!1,v.queues=[],v
},v.stateChanged=!1,v.doubleChecker=!1,v.doubleCheckComplete=function(){return v.stateChanged=!0,v.doubleCheckClear(),v
},v.doubleCheckClear=function(){return v.doubleChecker&&(B(v.doubleChecker),v.doubleChecker=!1),v
},v.doubleCheck=function(d){return v.stateChanged=!1,v.doubleCheckClear(),v.bugs.ieDoubleCheck&&(v.doubleChecker=j(function(){return v.doubleCheckClear(),v.stateChanged||d(),!0
},v.options.doubleCheckInterval)),v
},v.safariStatePoll=function(){var d=v.extractState(v.getLocationHref()),f;
if(!v.isLastSavedState(d)){return f=d,f||(f=v.createStateObject()),v.Adapter.trigger(x,"popstate"),v
}return
},v.back=function(d){return d!==!1&&v.busy()?(v.pushQueue({scope:v,callback:v.back,args:arguments,queue:d}),!1):(v.busy(!0),v.doubleCheck(function(){v.back(!1)
}),g.go(-1),!0)
},v.forward=function(d){return d!==!1&&v.busy()?(v.pushQueue({scope:v,callback:v.forward,args:arguments,queue:d}),!1):(v.busy(!0),v.doubleCheck(function(){v.forward(!1)
}),g.go(1),!0)
},v.go=function(f,d){var h;
if(f>0){for(h=1;
h<=f;
++h){v.forward(d)
}}else{if(!(f<0)){throw new Error("History.go: History.go requires a positive or negative integer passed.")
}for(h=-1;
h>=f;
--h){v.back(d)
}}return v
};
if(v.emulated.pushState){var c=function(){};
v.pushState=v.pushState||c,v.replaceState=v.replaceState||c
}else{v.onPopState=function(f,u){var l=!1,d=!1,h,p;
return v.doubleCheckComplete(),h=v.getHash(),h?(p=v.extractState(h||v.getLocationHref(),!0),p?v.replaceState(p.data,p.title,p.url,!1):(v.Adapter.trigger(x,"anchorchange"),v.busy(!1)),v.expectedStateId=!1,!1):(l=v.Adapter.extractEventData("state",f,u)||!1,l?d=v.getStateById(l):v.expectedStateId?d=v.getStateById(v.expectedStateId):d=v.extractState(v.getLocationHref()),d||(d=v.createStateObject(null,null,v.getLocationHref())),v.expectedStateId=!1,v.isLastSavedState(d)?(v.busy(!1),!1):(v.storeState(d),v.saveState(d),v.setTitle(d),v.Adapter.trigger(x,"statechange"),v.busy(!1),!0))
},v.Adapter.bind(x,"popstate",v.onPopState),v.pushState=function(f,o,l,d){if(v.getHashByUrl(l)&&v.emulated.pushState){throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).")
}if(d!==!1&&v.busy()){return v.pushQueue({scope:v,callback:v.pushState,args:arguments,queue:d}),!1
}v.busy(!0);
var h=v.createStateObject(f,o,l);
return v.isLastSavedState(h)?v.busy(!1):(v.storeState(h),v.expectedStateId=h.id,g.pushState(h.id,h.title,h.url),v.Adapter.trigger(x,"popstate")),!0
},v.replaceState=function(f,o,l,d){if(v.getHashByUrl(l)&&v.emulated.pushState){throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).")
}if(d!==!1&&v.busy()){return v.pushQueue({scope:v,callback:v.replaceState,args:arguments,queue:d}),!1
}v.busy(!0);
var h=v.createStateObject(f,o,l);
return v.isLastSavedState(h)?v.busy(!1):(v.storeState(h),v.expectedStateId=h.id,g.replaceState(h.id,h.title,h.url),v.Adapter.trigger(x,"popstate")),!0
}
}if(D){try{v.store=m.parse(D.getItem("History.store"))||{}
}catch(a){v.store={}
}v.normalizeStore()
}else{v.store={},v.normalizeStore()
}v.Adapter.bind(x,"unload",v.clearAllIntervals),v.saveState(v.storeState(v.extractState(v.getLocationHref(),!0))),D&&(v.onUnload=function(){var l,f,o;
try{l=m.parse(D.getItem("History.store"))||{}
}catch(h){l={}
}l.idToState=l.idToState||{},l.urlToId=l.urlToId||{},l.stateToId=l.stateToId||{};
for(f in v.idToState){if(!v.idToState.hasOwnProperty(f)){continue
}l.idToState[f]=v.idToState[f]
}for(f in v.urlToId){if(!v.urlToId.hasOwnProperty(f)){continue
}l.urlToId[f]=v.urlToId[f]
}for(f in v.stateToId){if(!v.stateToId.hasOwnProperty(f)){continue
}l.stateToId[f]=v.stateToId[f]
}v.store=l,v.normalizeStore(),o=m.stringify(l);
try{D.setItem("History.store",o)
}catch(d){if(d.code!==DOMException.QUOTA_EXCEEDED_ERR){throw d
}D.length&&(D.removeItem("History.store"),D.setItem("History.store",o))
}},v.intervalList.push(A(v.onUnload,v.options.storeInterval)),v.Adapter.bind(x,"beforeunload",v.onUnload),v.Adapter.bind(x,"unload",v.onUnload));
if(!v.emulated.pushState){v.bugs.safariPoll&&v.intervalList.push(A(v.safariStatePoll,v.options.safariPollInterval));
if(q.vendor==="Apple Computer, Inc."||(q.appCodeName||"")==="Mozilla"){v.Adapter.bind(x,"hashchange",function(){v.Adapter.trigger(x,"popstate")
}),v.getHash()&&v.Adapter.onDomLoad(function(){v.Adapter.trigger(x,"hashchange")
})
}}},(!v.options||!v.options.delayInit)&&v.init()
}(window);
window.Modernizr=function(aw,av,au){function T(b){am.cssText=b
}function S(d,c){return T(ai.join(d+";")+(c||""))
}function R(d,c){return typeof d===c
}function Q(d,c){return !!~(""+d).indexOf(c)
}function P(f,c){for(var h in f){var g=f[h];
if(!Q(g,"-")&&am[g]!==au){return c=="pfx"?g:!0
}}return !1
}function O(g,c,k){for(var j in g){var h=c[g[j]];
if(h!==au){return k===!1?g[j]:R(h,"function")?h.bind(k||c):h
}}return !1
}function N(g,f,k){var j=g.charAt(0).toUpperCase()+g.slice(1),h=(g+" "+ag.join(j+" ")+j).split(" ");
return R(f,"string")||R(f,"undefined")?P(h,f):(h=(g+" "+af.join(j+" ")+j).split(" "),O(h,f,k))
}function M(){ar.input=function(f){for(var b=0,a=f.length;
b<a;
b++){ab[f[b]]=f[b] in al
}return ab.list&&(ab.list=!!av.createElement("datalist")&&!!aw.HTMLDataListElement),ab
}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),ar.inputtypes=function(b){for(var l=0,k,j,g,c=b.length;
l<c;
l++){al.setAttribute("type",j=b[l]),k=al.type!=="text",k&&(al.value=ak,al.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(j)&&al.style.WebkitAppearance!==au?(ap.appendChild(al),g=av.defaultView,k=g.getComputedStyle&&g.getComputedStyle(al,null).WebkitAppearance!=="textfield"&&al.offsetHeight!==0,ap.removeChild(al)):/^(search|tel)$/.test(j)||(/^(url|email)$/.test(j)?k=al.checkValidity&&al.checkValidity()===!1:k=al.value!=ak)),ac[b[l]]=!!k
}return ac
}("search tel url email datetime date month week time datetime-local number range color".split(" "))
}var at="2.8.3",ar={},aq=!0,ap=av.documentElement,ao="modernizr",an=av.createElement(ao),am=an.style,al=av.createElement("input"),ak=":)",aj={}.toString,ai=" -webkit- -moz- -o- -ms- ".split(" "),ah="Webkit Moz O ms",ag=ah.split(" "),af=ah.toLowerCase().split(" "),ae={svg:"http://www.w3.org/2000/svg"},ad={},ac={},ab={},aa=[],Z=aa.slice,Y,X=function(v,u,t,s){var r,q,p,o,h=av.createElement("div"),g=av.body,b=g||av.createElement("body");
if(parseInt(t,10)){while(t--){p=av.createElement("div"),p.id=s?s[t]:ao+(t+1),h.appendChild(p)
}}return r=["&#173;",'<style id="s',ao,'">',v,"</style>"].join(""),h.id=ao,(g?h:b).innerHTML+=r,b.appendChild(h),g||(b.style.background="",b.style.overflow="hidden",o=ap.style.overflow,ap.style.overflow="hidden",ap.appendChild(b)),q=u(h,v),g?h.parentNode.removeChild(h):(b.parentNode.removeChild(b),ap.style.overflow=o),!!q
},W=function(){function c(h,g){g=g||av.createElement(b[h]||"div"),h="on"+h;
var a=h in g;
return a||(g.setAttribute||(g=av.createElement("div")),g.setAttribute&&g.removeAttribute&&(g.setAttribute(h,""),a=R(g[h],"function"),R(g[h],"undefined")||(g[h]=au),g.removeAttribute(h))),g=null,a
}var b={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};
return c
}(),V={}.hasOwnProperty,U;
!R(V,"undefined")&&!R(V.call,"undefined")?U=function(d,c){return V.call(d,c)
}:U=function(d,c){return c in d&&R(d.constructor.prototype[c],"undefined")
},Function.prototype.bind||(Function.prototype.bind=function(a){var h=this;
if(typeof h!="function"){throw new TypeError
}var g=Z.call(arguments,1),f=function(){if(this instanceof f){var b=function(){};
b.prototype=h.prototype;
var d=new b,c=h.apply(d,g.concat(Z.call(arguments)));
return Object(c)===c?c:d
}return h.apply(a,g.concat(Z.call(arguments)))
};
return f
}),ad.flexbox=function(){return N("flexWrap")
},ad.canvas=function(){var b=av.createElement("canvas");
return !!b.getContext&&!!b.getContext("2d")
},ad.canvastext=function(){return !!ar.canvas&&!!R(av.createElement("canvas").getContext("2d").fillText,"function")
},ad.webgl=function(){return !!aw.WebGLRenderingContext
},ad.touch=function(){var a;
return"ontouchstart" in aw||aw.DocumentTouch&&av instanceof DocumentTouch?a=!0:X(["@media (",ai.join("touch-enabled),("),ao,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(b){a=b.offsetTop===9
}),a
},ad.geolocation=function(){return"geolocation" in navigator
},ad.postmessage=function(){return !!aw.postMessage
},ad.websqldatabase=function(){return !!aw.openDatabase
},ad.indexedDB=function(){return !!N("indexedDB",aw)
},ad.hashchange=function(){return W("hashchange",aw)&&(av.documentMode===au||av.documentMode>7)
},ad.history=function(){return !!aw.history&&!!history.pushState
},ad.draganddrop=function(){var b=av.createElement("div");
return"draggable" in b||"ondragstart" in b&&"ondrop" in b
},ad.websockets=function(){return"WebSocket" in aw||"MozWebSocket" in aw
},ad.rgba=function(){return T("background-color:rgba(150,255,150,.5)"),Q(am.backgroundColor,"rgba")
},ad.hsla=function(){return T("background-color:hsla(120,40%,100%,.5)"),Q(am.backgroundColor,"rgba")||Q(am.backgroundColor,"hsla")
},ad.multiplebgs=function(){return T("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(am.background)
},ad.backgroundsize=function(){return N("backgroundSize")
},ad.borderimage=function(){return N("borderImage")
},ad.borderradius=function(){return N("borderRadius")
},ad.boxshadow=function(){return N("boxShadow")
},ad.textshadow=function(){return av.createElement("div").style.textShadow===""
},ad.opacity=function(){return S("opacity:.55"),/^0.55$/.test(am.opacity)
},ad.cssanimations=function(){return N("animationName")
},ad.csscolumns=function(){return N("columnCount")
},ad.cssgradients=function(){var e="background-image:",d="gradient(linear,left top,right bottom,from(#9f9),to(white));",f="linear-gradient(left top,#9f9, white);";
return T((e+"-webkit- ".split(" ").join(d+e)+ai.join(f+e)).slice(0,-e.length)),Q(am.backgroundImage,"gradient")
},ad.cssreflections=function(){return N("boxReflect")
},ad.csstransforms=function(){return !!N("transform")
},ad.csstransforms3d=function(){var b=!!N("perspective");
return b&&"webkitPerspective" in ap.style&&X("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(a,d){b=a.offsetLeft===9&&a.offsetHeight===3
}),b
},ad.csstransitions=function(){return N("transition")
},ad.fontface=function(){var b;
return X('@font-face {font-family:"font";src:url("https://")}',function(l,k){var j=av.getElementById("smodernizr"),h=j.sheet||j.styleSheet,a=h?h.cssRules&&h.cssRules[0]?h.cssRules[0].cssText:h.cssText||"":"";
b=/src/i.test(a)&&a.indexOf(k.split(" ")[0])===0
}),b
},ad.generatedcontent=function(){var b;
return X(["#",ao,"{font:0/0 a}#",ao,':after{content:"',ak,'";visibility:hidden;font:3px/1 a}'].join(""),function(a){b=a.offsetHeight>=3
}),b
},ad.video=function(){var b=av.createElement("video"),f=!1;
try{if(f=!!b.canPlayType){f=new Boolean(f),f.ogg=b.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),f.h264=b.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),f.webm=b.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")
}}catch(e){}return f
},ad.audio=function(){var b=av.createElement("audio"),f=!1;
try{if(f=!!b.canPlayType){f=new Boolean(f),f.ogg=b.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),f.mp3=b.canPlayType("audio/mpeg;").replace(/^no$/,""),f.wav=b.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),f.m4a=(b.canPlayType("audio/x-m4a;")||b.canPlayType("audio/aac;")).replace(/^no$/,"")
}}catch(e){}return f
},ad.localstorage=function(){try{return localStorage.setItem(ao,ao),localStorage.removeItem(ao),!0
}catch(b){return !1
}},ad.sessionstorage=function(){try{return sessionStorage.setItem(ao,ao),sessionStorage.removeItem(ao),!0
}catch(b){return !1
}},ad.webworkers=function(){return !!aw.Worker
},ad.applicationcache=function(){return !!aw.applicationCache
},ad.svg=function(){return !!av.createElementNS&&!!av.createElementNS(ae.svg,"svg").createSVGRect
},ad.inlinesvg=function(){var b=av.createElement("div");
return b.innerHTML="<svg/>",(b.firstChild&&b.firstChild.namespaceURI)==ae.svg
},ad.smil=function(){return !!av.createElementNS&&/SVGAnimate/.test(aj.call(av.createElementNS(ae.svg,"animate")))
},ad.svgclippaths=function(){return !!av.createElementNS&&/SVGClipPath/.test(aj.call(av.createElementNS(ae.svg,"clipPath")))
};
for(var L in ad){U(ad,L)&&(Y=L.toLowerCase(),ar[Y]=ad[L](),aa.push((ar[Y]?"":"no-")+Y))
}return ar.input||M(),ar.addTest=function(e,c){if(typeof e=="object"){for(var f in e){U(e,f)&&ar.addTest(f,e[f])
}}else{e=e.toLowerCase();
if(ar[e]!==au){return ar
}c=typeof c=="function"?c():c,typeof aq!="undefined"&&aq&&(ap.className+=" "+(c?"":"no-")+e),ar[e]=c
}return ar
},T(""),an=al=null,function(ax,K){function A(f,e){var h=f.createElement("p"),g=f.getElementsByTagName("head")[0]||f.documentElement;
return h.innerHTML="x<style>"+e+"</style>",g.insertBefore(h.lastChild,g.firstChild)
}function z(){var b=t.elements;
return typeof b=="string"?b.split(" "):b
}function y(d){var c=C[d[E]];
return c||(c={},D++,d[E]=D,C[D]=c),c
}function x(b,h,f){h||(h=K);
if(B){return h.createElement(b)
}f||(f=y(h));
var e;
return f.cache[b]?e=f.cache[b].cloneNode():G.test(b)?e=(f.cache[b]=f.createElem(b)).cloneNode():e=f.createElem(b),e.canHaveChildren&&!H.test(b)&&!e.tagUrn?f.frag.appendChild(e):e
}function w(b,m){b||(b=K);
if(B){return b.createDocumentFragment()
}m=m||y(b);
var l=m.frag.cloneNode(),k=0,j=z(),h=j.length;
for(;
k<h;
k++){l.createElement(j[k])
}return l
}function v(d,c){c.cache||(c.cache={},c.createElem=d.createElement,c.createFrag=d.createDocumentFragment,c.frag=c.createFrag()),d.createElement=function(a){return t.shivMethods?x(a,d,c):c.createElem(a)
},d.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+z().join().replace(/[\w\-]+/g,function(b){return c.createElem(b),c.frag.createElement(b),'c("'+b+'")'
})+");return n}")(t,c.frag)
}function u(b){b||(b=K);
var d=y(b);
return t.shivCSS&&!F&&!d.hasCSS&&(d.hasCSS=!!A(b,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),B||v(b,d),b
}var J="3.7.0",I=ax.html5||{},H=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,G=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,F,E="_html5shiv",D=0,C={},B;
(function(){try{var b=K.createElement("a");
b.innerHTML="<xyz></xyz>",F="hidden" in b,B=b.childNodes.length==1||function(){K.createElement("a");
var c=K.createDocumentFragment();
return typeof c.cloneNode=="undefined"||typeof c.createDocumentFragment=="undefined"||typeof c.createElement=="undefined"
}()
}catch(d){F=!0,B=!0
}})();
var t={elements:I.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:J,shivCSS:I.shivCSS!==!1,supportsUnknownElements:B,shivMethods:I.shivMethods!==!1,type:"default",shivDocument:u,createElement:x,createDocumentFragment:w};
ax.html5=t,u(K)
}(this,av),ar._version=at,ar._prefixes=ai,ar._domPrefixes=af,ar._cssomPrefixes=ag,ar.hasEvent=W,ar.testProp=function(b){return P([b])
},ar.testAllProps=N,ar.testStyles=X,ap.className=ap.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(aq?" js "+aa.join(" "):""),ar
}(this,this.document),function(ad,ac,ab){function aa(b){return"[object Function]"==P.call(b)
}function Z(b){return"string"==typeof b
}function Y(){}function X(b){return !b||"loaded"==b||"complete"==b||"uninitialized"==b
}function W(){var b=O.shift();
M=1,b?b.t?R(function(){("c"==b.t?L.injectCss:L.injectJs)(b.s,0,b.a,b.x,b.e,1)
},0):(b(),W()):M=0
}function V(w,v,t,s,q,p,n){function m(a){if(!g&&X(h.readyState)&&(x.r=g=1,!M&&W(),h.onload=h.onreadystatechange=null,a)){"img"!=w&&R(function(){I.removeChild(h)
},50);
for(var c in D[v]){D[v].hasOwnProperty(c)&&D[v][c].onload()
}}}var n=n||L.errorTimeout,h=ac.createElement(w),g=0,b=0,x={t:t,s:v,e:q,a:p,x:n};
1===D[v]&&(b=1,D[v]=[]),"object"==w?h.data=v:(h.src=v,h.type=w),h.width=h.height="0",h.onerror=h.onload=h.onreadystatechange=function(){m.call(this,b)
},O.splice(s,0,x),"img"!=w&&(b||2===D[v]?(I.insertBefore(h,J?null:Q),R(m,n)):D[v].push(h))
}function U(g,e,k,j,h){return M=0,e=e||"j",Z(g)?V("c"==e?G:H,g,e,this.i++,k,j,h):(O.splice(this.i++,0,g),1==O.length&&W()),this
}function T(){var b=L;
return b.loader={load:U,i:0},b
}var S=ac.documentElement,R=ad.setTimeout,Q=ac.getElementsByTagName("script")[0],P={}.toString,O=[],M=0,K="MozAppearance" in S.style,J=K&&!!ac.createRange().compareNode,I=J?S:Q.parentNode,S=ad.opera&&"[object Opera]"==P.call(ad.opera),S=!!ac.attachEvent&&!S,H=K?"object":S?"script":"img",G=S?"script":H,F=Array.isArray||function(b){return"[object Array]"==P.call(b)
},E=[],D={},C={timeout:function(d,c){return c.length&&(d.timeout=c[0]),d
}},N,L;
L=function(e){function c(j){var j=j.split("!"),h=E.length,r=j.pop(),q=j.length,r={url:r,origUrl:r,prefixes:j},p,o,l;
for(o=0;
o<q;
o++){l=j[o].split("="),(p=C[l.shift()])&&(r=p(r,l))
}for(o=0;
o<h;
o++){r=E[o](r)
}return r
}function n(b,s,r,q,p){var o=c(b),l=o.autoCallback;
o.url.split(".").pop().split("?").shift(),o.bypass||(s&&(s=aa(s)?s:s[b]||s[q]||s[b.split("/").pop().split("?")[0]]),o.instead?o.instead(b,s,r,q,p):(D[o.url]?o.noexec=!0:D[o.url]=1,r.load(o.url,o.forceCSS||!o.forceJS&&"css"==o.url.split(".").pop().split("?").shift()?"c":ab,o.noexec,o.attrs,o.timeout),(aa(s)||aa(l))&&r.load(function(){T(),s&&s(o.origUrl,p,q),l&&l(o.origUrl,p,q),D[o.url]=2
})))
}function m(w,v){function u(b,h){if(b){if(Z(b)){h||(r=function(){var j=[].slice.call(arguments);
q.apply(this,j),p()
}),n(b,r,v,0,t)
}else{if(Object(b)===b){for(g in o=function(){var a=0,j;
for(j in b){b.hasOwnProperty(j)&&a++
}return a
}(),b){b.hasOwnProperty(g)&&(!h&&!--o&&(aa(r)?r=function(){var j=[].slice.call(arguments);
q.apply(this,j),p()
}:r[g]=function(j){return function(){var a=[].slice.call(arguments);
j&&j.apply(this,a),p()
}
}(q[g])),n(b[g],r,v,g,t))
}}}}else{!h&&p()
}}var t=!!w.test,s=w.load||w.both,r=w.callback||Y,q=r,p=w.complete||Y,o,g;
u(t?w.yep:w.nope,!!s),s&&u(s)
}var k,f,d=this.yepnope.loader;
if(Z(e)){n(e,0,d,0)
}else{if(F(e)){for(k=0;
k<e.length;
k++){f=e[k],Z(f)?n(f,0,d,0):F(f)?L(f):Object(f)===f&&m(f,d)
}}else{Object(e)===e&&m(e,d)
}}},L.addPrefix=function(d,c){C[d]=c
},L.addFilter=function(b){E.push(b)
},L.errorTimeout=10000,null==ac.readyState&&ac.addEventListener&&(ac.readyState="loading",ac.addEventListener("DOMContentLoaded",N=function(){ac.removeEventListener("DOMContentLoaded",N,0),ac.readyState="complete"
},0)),ad.yepnope=T(),ad.yepnope.executeStack=W,ad.yepnope.injectJs=function(r,q,p,n,m,h){var g=ac.createElement("script"),f,b,n=n||L.errorTimeout;
g.src=r;
for(b in p){g.setAttribute(b,p[b])
}q=h?W:q||Y,g.onreadystatechange=g.onload=function(){!f&&X(g.readyState)&&(f=1,q(),g.onload=g.onreadystatechange=null)
},R(function(){f||(f=1,q(1))
},n),m?g.onload():Q.parentNode.insertBefore(g,Q)
},ad.yepnope.injectCss=function(b,n,m,l,k,h){var l=ac.createElement("link"),f,n=h?W:n||Y;
l.href=b,l.rel="stylesheet",l.type="text/css";
for(f in m){l.setAttribute(f,m[f])
}k||(Q.parentNode.insertBefore(l,Q),R(n,0))
}
}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))
};
/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
;
/*! NOTE: If you're already including a window.matchMedia polyfill via Modernizr or otherwise, you don't need this part */
;
window.matchMedia=window.matchMedia||function(b){var m,l=b.documentElement,k=l.firstElementChild||l.firstChild,j=b.createElement("body"),h=b.createElement("div");
return h.id="mq-test-1",h.style.cssText="position:absolute;top:-100em",j.style.background="none",j.appendChild(h),function(c){return h.innerHTML='&shy;<style media="'+c+'"> #mq-test-1 { width: 42px; }</style>',l.insertBefore(j,k),m=42===h.offsetWidth,l.removeChild(j),{matches:m,media:c}
}
}(document);
/*! Respond.js v1.1.0: min/max-width media query polyfill. (c) Scott Jehl. MIT/GPLv2 Lic. j.mp/respondjs  */
(function(V){function y(){B(!0)
}var U={};
if(V.respond=U,U.update=function(){},U.mediaQueriesSupported=V.matchMedia&&V.matchMedia("only all").matches,!U.mediaQueriesSupported){var F,E,C,T=V.document,S=T.documentElement,R=[],Q=[],P=[],O={},N=30,M=T.getElementsByTagName("head")[0]||S,L=T.getElementsByTagName("base")[0],K=M.getElementsByTagName("link"),J=[],I=function(){for(var a=0;
K.length>a;
a++){var k=K[a],j=k.href,h=k.media,g=k.rel&&"stylesheet"===k.rel.toLowerCase();
j&&g&&!O[j]&&(k.styleSheet&&k.styleSheet.rawCssText?(G(k.styleSheet.rawCssText,j,h),O[j]=!0):(!/^([a-zA-Z:]*\/\/)/.test(j)&&!L||j.replace(RegExp.$1,"").split("/")[0]===V.location.host)&&J.push({href:j,media:h}))
}H()
},H=function(){if(J.length){var b=J.shift();
A(b.href,function(a){G(a,b.href,b.media),O[b.href]=!0,setTimeout(function(){H()
},0)
})
}},G=function(X,W,x){var w=X.match(/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi),v=w&&w.length||0;
W=W.substring(0,W.lastIndexOf("/"));
var u=function(b){return b.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,"$1"+W+"$2$3")
},t=!v&&x;
W.length&&(W+="/"),t&&(v=1);
for(var s=0;
v>s;
s++){var r,q,p,f;
t?(r=x,Q.push(u(X))):(r=w[s].match(/@media *([^\{]+)\{([\S\s]+?)$/)&&RegExp.$1,Q.push(RegExp.$2&&u(RegExp.$2))),p=r.split(","),f=p.length;
for(var e=0;
f>e;
e++){q=p[e],R.push({media:q.split("(")[0].match(/(only\s+)?([a-zA-Z]+)\s?/)&&RegExp.$2||"all",rules:Q.length-1,hasquery:q.indexOf("(")>-1,minw:q.match(/\(min\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||""),maxw:q.match(/\(max\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||"")})
}}B()
},D=function(){var d,c=T.createElement("div"),h=T.body,g=!1;
return c.style.cssText="position:absolute;font-size:1em;width:1em",h||(h=g=T.createElement("body"),h.style.background="none"),h.appendChild(c),S.insertBefore(h,S.firstChild),d=c.offsetWidth,g?S.removeChild(h):h.removeChild(c),d=C=parseFloat(d)
},B=function(ab){var aa="clientWidth",Z=S[aa],Y="CSS1Compat"===T.compatMode&&Z||T.body[aa]||Z,X={},W=K[K.length-1],u=(new Date).getTime();
if(ab&&F&&N>u-F){return clearTimeout(E),E=setTimeout(B,N),void 0
}F=u;
for(var t in R){if(R.hasOwnProperty(t)){var g=R[t],f=g.minw,e=g.maxw,d=null===f,c=null===e,s="em";
f&&(f=parseFloat(f)*(f.indexOf(s)>-1?C||D():1)),e&&(e=parseFloat(e)*(e.indexOf(s)>-1?C||D():1)),g.hasquery&&(d&&c||!(d||Y>=f)||!(c||e>=Y))||(X[g.media]||(X[g.media]=[]),X[g.media].push(Q[g.rules]))
}}for(var r in P){P.hasOwnProperty(r)&&P[r]&&P[r].parentNode===M&&M.removeChild(P[r])
}for(var q in X){if(X.hasOwnProperty(q)){var l=T.createElement("style"),j=X[q].join("\n");
l.type="text/css",l.media=q,M.insertBefore(l,W.nextSibling),l.styleSheet?l.styleSheet.cssText=j:l.appendChild(T.createTextNode(j)),P.push(l)
}}},A=function(e,d){var f=z();
f&&(f.open("GET",e,!0),f.onreadystatechange=function(){4!==f.readyState||200!==f.status&&304!==f.status||d(f.responseText)
},4!==f.readyState&&f.send(null))
},z=function(){var a=!1;
try{a=new V.XMLHttpRequest
}catch(d){a=new V.ActiveXObject("Microsoft.XMLHTTP")
}return function(){return a
}
}();
I(),U.update=I,V.addEventListener?V.addEventListener("resize",y,!1):V.attachEvent&&V.attachEvent("onresize",y)
}})(this);
(function(b){b.fn.rwdImageMaps=function(){var d=this;
var a=function(){d.each(function(){if(typeof(b(this).attr("usemap"))=="undefined"){return
}var c=this,f=b(c);
b("<img />").load(function(){var u="width",p="height",h=f.attr(u),s=f.attr(p);
if(!h||!s){var e=new Image();
e.src=f.attr("src");
if(!h){h=e.width
}if(!s){s=e.height
}}var v=f.width()/100,r=f.height()/100,t=f.attr("usemap").replace("#",""),q="coords";
b('map[name="'+t+'"]').find("area").each(function(){var j=b(this);
if(!j.data(q)){j.data(q,j.attr(q))
}var k=j.data(q).split(","),l=new Array(k.length);
for(var g=0;
g<l.length;
++g){if(g%2===0){l[g]=parseInt(((k[g]/h)*100)*v)
}else{l[g]=parseInt(((k[g]/s)*100)*r)
}}j.attr(q,l.toString())
})
}).attr("src",f.attr("src"))
})
};
b(window).resize(a).trigger("resize");
return this
}
})(jQuery);
jQuery(document).ready(function(a){jQuery("img[usemap]").rwdImageMaps()
});
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&"object"==typeof module.exports?module.exports=a(require("jquery")):a(jQuery)
}(function(a){return function(c){var b=c.tablesorter={version:"2.30.5",parsers:[],widgets:[],defaults:{theme:"default",widthFixed:!1,showProcessing:!1,headerTemplate:"{content}",onRenderTemplate:null,onRenderHeader:null,cancelSelection:!0,tabIndex:!0,dateFormat:"mmddyyyy",sortMultiSortKey:"shiftKey",sortResetKey:"ctrlKey",usNumberFormat:!0,delayInit:!1,serverSideSorting:!1,resort:!0,headers:{},ignoreCase:!0,sortForce:null,sortList:[],sortAppend:null,sortStable:!1,sortInitialOrder:"asc",sortLocaleCompare:!1,sortReset:!1,sortRestart:!1,emptyTo:"bottom",stringTo:"max",duplicateSpan:!0,textExtraction:"basic",textAttribute:"data-text",textSorter:null,numberSorter:null,initWidgets:!0,widgetClass:"widget-{name}",widgets:[],widgetOptions:{zebra:["even","odd"]},initialized:null,tableClass:"",cssAsc:"",cssDesc:"",cssNone:"",cssHeader:"",cssHeaderRow:"",cssProcessing:"",cssChildRow:"tablesorter-childRow",cssInfoBlock:"tablesorter-infoOnly",cssNoSort:"tablesorter-noSort",cssIgnoreRow:"tablesorter-ignoreRow",cssIcon:"tablesorter-icon",cssIconNone:"",cssIconAsc:"",cssIconDesc:"",cssIconDisabled:"",pointerClick:"click",pointerDown:"mousedown",pointerUp:"mouseup",selectorHeaders:"> thead th, > thead td",selectorSort:"th, td",selectorRemove:".remove-me",debug:!1,headerList:[],empties:{},strings:{},parsers:[],globalize:0,imgAttr:0},css:{table:"tablesorter",cssHasChild:"tablesorter-hasChildRow",childRow:"tablesorter-childRow",colgroup:"tablesorter-colgroup",header:"tablesorter-header",headerRow:"tablesorter-headerRow",headerIn:"tablesorter-header-inner",icon:"tablesorter-icon",processing:"tablesorter-processing",sortAsc:"tablesorter-headerAsc",sortDesc:"tablesorter-headerDesc",sortNone:"tablesorter-headerUnSorted"},language:{sortAsc:"Ascending sort applied, ",sortDesc:"Descending sort applied, ",sortNone:"No sort applied, ",sortDisabled:"sorting is disabled",nextAsc:"activate to apply an ascending sort",nextDesc:"activate to apply a descending sort",nextNone:"activate to remove the sort"},regex:{templateContent:/\{content\}/g,templateIcon:/\{icon\}/g,templateName:/\{name\}/i,spaces:/\s+/g,nonWord:/\W/g,formElements:/(input|select|button|textarea)/i,chunk:/(^([+\-]?(?:\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,chunks:/(^\\0|\\0$)/,hex:/^0x[0-9a-f]+$/i,comma:/,/g,digitNonUS:/[\s|\.]/g,digitNegativeTest:/^\s*\([.\d]+\)/,digitNegativeReplace:/^\s*\(([.\d]+)\)/,digitTest:/^[\-+(]?\d+[)]?$/,digitReplace:/[,.'"\s]/g},string:{max:1,min:-1,emptymin:1,emptymax:-1,zero:0,none:0,"null":0,top:!0,bottom:!1},keyCodes:{enter:13},dates:{},instanceMethods:{},setup:function(f,g){if(f&&f.tHead&&0!==f.tBodies.length&&!0!==f.hasInitialized){var e="",d=c(f),h=c.metadata;
f.hasInitialized=!1,f.isProcessing=!0,f.config=g,c.data(f,"tablesorter",g),b.debug(g,"core")&&(console[console.group?"group":"log"]("Initializing tablesorter v"+b.version),c.data(f,"startoveralltimer",new Date)),g.supportsDataObject=function(j){return j[0]=parseInt(j[0],10),j[0]>1||1===j[0]&&parseInt(j[1],10)>=4
}(c.fn.jquery.split(".")),g.emptyTo=g.emptyTo.toLowerCase(),g.stringTo=g.stringTo.toLowerCase(),g.last={sortList:[],clickedIndex:-1},/tablesorter\-/.test(d.attr("class"))||(e=""!==g.theme?" tablesorter-"+g.theme:""),g.namespace?g.namespace="."+g.namespace.replace(b.regex.nonWord,""):g.namespace=".tablesorter"+Math.random().toString(16).slice(2),g.table=f,g.$table=d.addClass(b.css.table+" "+g.tableClass+e+" "+g.namespace.slice(1)).attr("role","grid"),g.$headers=d.find(g.selectorHeaders),g.$table.children().children("tr").attr("role","row"),g.$tbodies=d.children("tbody:not(."+g.cssInfoBlock+")").attr({"aria-live":"polite","aria-relevant":"all"}),g.$table.children("caption").length&&((e=g.$table.children("caption")[0]).id||(e.id=g.namespace.slice(1)+"caption"),g.$table.attr("aria-labelledby",e.id)),g.widgetInit={},g.textExtraction=g.$table.attr("data-text-extraction")||g.textExtraction||"basic",b.buildHeaders(g),b.fixColumnWidth(f),b.addWidgetFromClass(f),b.applyWidgetOptions(f),b.setupParsers(g),g.totalRows=0,g.debug&&b.validateOptions(g),g.delayInit||b.buildCache(g),b.bindEvents(f,g.$headers,!0),b.bindMethods(g),g.supportsDataObject&&void 0!==d.data().sortlist?g.sortList=d.data().sortlist:h&&d.metadata()&&d.metadata().sortlist&&(g.sortList=d.metadata().sortlist),b.applyWidget(f,!0),g.sortList.length>0?b.sortOn(g,g.sortList,{},!g.initWidgets):(b.setHeadersCss(g),g.initWidgets&&b.applyWidget(f,!1)),g.showProcessing&&d.unbind("sortBegin"+g.namespace+" sortEnd"+g.namespace).bind("sortBegin"+g.namespace+" sortEnd"+g.namespace,function(j){clearTimeout(g.timerProcessing),b.isProcessing(f),"sortBegin"===j.type&&(g.timerProcessing=setTimeout(function(){b.isProcessing(f,!0)
},500))
}),f.hasInitialized=!0,f.isProcessing=!1,b.debug(g,"core")&&(console.log("Overall initialization time:"+b.benchmark(c.data(f,"startoveralltimer"))),b.debug(g,"core")&&console.groupEnd&&console.groupEnd()),d.triggerHandler("tablesorter-initialized",f),"function"==typeof g.initialized&&g.initialized(f)
}else{b.debug(g,"core")&&(f.hasInitialized?console.warn("Stopping initialization. Tablesorter has already been initialized"):console.error("Stopping initialization! No table, thead or tbody",f))
}},bindMethods:function(f){var g=f.$table,e=f.namespace,d="sortReset update updateRows updateAll updateHeaders addRows updateCell updateComplete sorton appendCache updateCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave ".split(" ").join(e+" ");
g.unbind(d.replace(b.regex.spaces," ")).bind("sortReset"+e,function(j,h){j.stopPropagation(),b.sortReset(this.config,function(k){k.isApplyingWidgets?setTimeout(function(){b.applyWidget(k,"",h)
},100):b.applyWidget(k,"",h)
})
}).bind("updateAll"+e,function(j,h,k){j.stopPropagation(),b.updateAll(this.config,h,k)
}).bind("update"+e+" updateRows"+e,function(j,h,k){j.stopPropagation(),b.update(this.config,h,k)
}).bind("updateHeaders"+e,function(j,h){j.stopPropagation(),b.updateHeaders(this.config,h)
}).bind("updateCell"+e,function(k,j,l,h){k.stopPropagation(),b.updateCell(this.config,j,l,h)
}).bind("addRows"+e,function(k,j,l,h){k.stopPropagation(),b.addRows(this.config,j,l,h)
}).bind("updateComplete"+e,function(){this.isUpdating=!1
}).bind("sorton"+e,function(k,j,l,h){k.stopPropagation(),b.sortOn(this.config,j,l,h)
}).bind("appendCache"+e,function(j,k,h){j.stopPropagation(),b.appendCache(this.config,h),c.isFunction(k)&&k(this)
}).bind("updateCache"+e,function(j,h,k){j.stopPropagation(),b.updateCache(this.config,h,k)
}).bind("applyWidgetId"+e,function(j,h){j.stopPropagation(),b.applyWidgetId(this,h)
}).bind("applyWidgets"+e,function(j,h){j.stopPropagation(),b.applyWidget(this,!1,h)
}).bind("refreshWidgets"+e,function(j,h,k){j.stopPropagation(),b.refreshWidgets(this,h,k)
}).bind("removeWidget"+e,function(j,h,k){j.stopPropagation(),b.removeWidget(this,h,k)
}).bind("destroy"+e,function(j,h,k){j.stopPropagation(),b.destroy(this,h,k)
}).bind("resetToLoadState"+e,function(j){j.stopPropagation(),b.removeWidget(this,!0,!1);
var h=c.extend(!0,{},f.originalSettings);
(f=c.extend(!0,{},b.defaults,h)).originalSettings=h,this.hasInitialized=!1,b.setup(this,f)
})
},bindEvents:function(h,j,g){var e,k=(h=c(h)[0]).config,f=k.namespace,d=null;
!0!==g&&(j.addClass(f.slice(1)+"_extra_headers"),(e=b.getClosest(j,"table")).length&&"TABLE"===e[0].nodeName&&e[0]!==h&&c(e[0]).addClass(f.slice(1)+"_extra_table")),e=(k.pointerDown+" "+k.pointerUp+" "+k.pointerClick+" sort keyup ").replace(b.regex.spaces," ").split(" ").join(f+" "),j.find(k.selectorSort).add(j.filter(k.selectorSort)).unbind(e).bind(e,function(p,t){var n,l,m,q=c(p.target),u=" "+p.type+" ";
if(!(1!==(p.which||p.button)&&!u.match(" "+k.pointerClick+" | sort | keyup ")||" keyup "===u&&p.which!==b.keyCodes.enter||u.match(" "+k.pointerClick+" ")&&void 0!==p.which||u.match(" "+k.pointerUp+" ")&&d!==p.target&&!0!==t)){if(u.match(" "+k.pointerDown+" ")){return d=p.target,void ("1"===(m=q.jquery.split("."))[0]&&m[1]<4&&p.preventDefault())
}if(d=null,n=b.getClosest(c(this),"."+b.css.header),b.regex.formElements.test(p.target.nodeName)||q.hasClass(k.cssNoSort)||q.parents("."+k.cssNoSort).length>0||n.hasClass("sorter-false")||q.parents("button").length>0){return !k.cancelSelection
}k.delayInit&&b.isEmptyObject(k.cache)&&b.buildCache(k),k.last.clickedIndex=n.attr("data-column")||n.index(),(l=k.$headerIndexed[k.last.clickedIndex][0])&&!l.sortDisabled&&b.initSort(k,l,p)
}}),k.cancelSelection&&j.attr("unselectable","on").bind("selectstart",!1).css({"user-select":"none",MozUserSelect:"none"})
},buildHeaders:function(f){var g,e,d,h;
for(f.headerList=[],f.headerContent=[],f.sortVars=[],b.debug(f,"core")&&(d=new Date),f.columns=b.computeColumnIndex(f.$table.children("thead, tfoot").children("tr")),e=f.cssIcon?'<i class="'+(f.cssIcon===b.css.icon?b.css.icon:f.cssIcon+" "+b.css.icon)+'"></i>':"",f.$headers=c(c.map(f.$table.find(f.selectorHeaders),function(r,k){var t,m,j,q,s,p=c(r);
if(!b.getClosest(p,"tr").hasClass(f.cssIgnoreRow)){return/(th|td)/i.test(r.nodeName)||(s=b.getClosest(p,"th, td"),p.attr("data-column",s.attr("data-column"))),t=b.getColumnData(f.table,f.headers,k,!0),f.headerContent[k]=p.html(),""===f.headerTemplate||p.find("."+b.css.headerIn).length||(q=f.headerTemplate.replace(b.regex.templateContent,p.html()).replace(b.regex.templateIcon,p.find("."+b.css.icon).length?"":e),f.onRenderTemplate&&(m=f.onRenderTemplate.apply(p,[k,q]))&&"string"==typeof m&&(q=m),p.html('<div class="'+b.css.headerIn+'">'+q+"</div>")),f.onRenderHeader&&f.onRenderHeader.apply(p,[k,f,f.$table]),j=parseInt(p.attr("data-column"),10),r.column=j,s=b.getOrder(b.getData(p,t,"sortInitialOrder")||f.sortInitialOrder),f.sortVars[j]={count:-1,order:s?f.sortReset?[1,0,2]:[1,0]:f.sortReset?[0,1,2]:[0,1],lockedOrder:!1},void 0!==(s=b.getData(p,t,"lockedOrder")||!1)&&!1!==s&&(f.sortVars[j].lockedOrder=!0,f.sortVars[j].order=b.getOrder(s)?[1,1]:[0,0]),f.headerList[k]=r,p.addClass(b.css.header+" "+f.cssHeader),b.getClosest(p,"tr").addClass(b.css.headerRow+" "+f.cssHeaderRow).attr("role","row"),f.tabIndex&&p.attr("tabindex",0),r
}})),f.$headerIndexed=[],h=0;
h<f.columns;
h++){b.isEmptyObject(f.sortVars[h])&&(f.sortVars[h]={}),g=f.$headers.filter('[data-column="'+h+'"]'),f.$headerIndexed[h]=g.length?g.not(".sorter-false").length?g.not(".sorter-false").filter(":last"):g.filter(":last"):c()
}f.$table.find(f.selectorHeaders).attr({scope:"col",role:"columnheader"}),b.updateHeader(f),b.debug(f,"core")&&(console.log("Built headers:"+b.benchmark(d)),console.log(f.$headers))
},addInstanceMethods:function(d){c.extend(b.instanceMethods,d)
},setupParsers:function(J,z){var B,v,N,C,F,E,K,L,H,A,t,I,G,D,M=J.table,j=0,q=b.debug(J,"core"),k={};
if(J.$tbodies=J.$table.children("tbody:not(."+J.cssInfoBlock+")"),G=void 0===z?J.$tbodies:z,0===(D=G.length)){return q?console.warn("Warning: *Empty table!* Not building a parser cache"):""
}for(q&&(I=new Date,console[console.group?"group":"log"]("Detecting parsers for each column")),v={extractors:[],parsers:[]};
j<D;
){if((B=G[j].rows).length){for(F=0,C=J.columns,E=0;
E<C;
E++){if((K=J.$headerIndexed[F])&&K.length&&(L=b.getColumnData(M,J.headers,F),t=b.getParserById(b.getData(K,L,"extractor")),A=b.getParserById(b.getData(K,L,"sorter")),H="false"===b.getData(K,L,"parser"),J.empties[F]=(b.getData(K,L,"empty")||J.emptyTo||(J.emptyToBottom?"bottom":"top")).toLowerCase(),J.strings[F]=(b.getData(K,L,"string")||J.stringTo||"max").toLowerCase(),H&&(A=b.getParserById("no-parser")),t||(t=!1),A||(A=b.detectParserForColumn(J,B,-1,F)),q&&(k["("+F+") "+K.text()]={parser:A.id,extractor:t?t.id:"none",string:J.strings[F],empty:J.empties[F]}),v.parsers[F]=A,v.extractors[F]=t,(N=K[0].colSpan-1)>0)){for(F+=N,C+=N;
N+1>0;
){v.parsers[F-N]=A,v.extractors[F-N]=t,N--
}}F++
}}j+=v.parsers.length?D:1
}q&&(b.isEmptyObject(k)?console.warn("  No parsers detected!"):console[console.table?"table":"log"](k),console.log("Completed detecting parsers"+b.benchmark(I)),console.groupEnd&&console.groupEnd()),J.parsers=v.parsers,J.extractors=v.extractors
},addParser:function(g){var f,h=b.parsers.length,d=!0;
for(f=0;
f<h;
f++){b.parsers[f].id.toLowerCase()===g.id.toLowerCase()&&(d=!1)
}d&&(b.parsers[b.parsers.length]=g)
},getParserById:function(f){if("false"==f){return !1
}var d,g=b.parsers.length;
for(d=0;
d<g;
d++){if(b.parsers[d].id.toLowerCase()===f.toString().toLowerCase()){return b.parsers[d]
}}return !1
},detectParserForColumn:function(e,h,y,w){for(var j,m,k,t=b.parsers.length,v=!1,q="",f=b.debug(e,"core"),x=!0;
""===q&&x;
){(k=h[++y])&&y<50?k.className.indexOf(b.cssIgnoreRow)<0&&(v=h[y].cells[w],q=b.getElementText(e,v,w),m=c(v),f&&console.log("Checking if value was empty on row "+y+", column: "+w+': "'+q+'"')):x=!1
}for(;
--t>=0;
){if((j=b.parsers[t])&&"text"!==j.id&&j.is&&j.is(q,e.table,v,m)){return j
}}return b.getParserById("text")
},getElementText:function(g,h,f){if(!h){return""
}var d,j=g.textExtraction||"",e=h.jquery?h:c(h);
return"string"==typeof j?"basic"===j&&void 0!==(d=e.attr(g.textAttribute))?c.trim(d):c.trim(h.textContent||e.text()):"function"==typeof j?c.trim(j(e[0],g.table,f)):"function"==typeof(d=b.getColumnData(g.table,j,f))?c.trim(d(e[0],g.table,f)):c.trim(e[0].textContent||e.text())
},getParsedText:function(j,h,k,g){void 0===g&&(g=b.getElementText(j,h,k));
var d=""+g,l=j.parsers[k],f=j.extractors[k];
return l&&(f&&"function"==typeof f.format&&(g=f.format(g,j.table,h,k)),d="no-parser"===l.id?"":l.format(""+g,j.table,h,k),j.ignoreCase&&"string"==typeof d&&(d=d.toLowerCase())),d
},buildCache:function(M,P,J){var ac,Q,V,U,Z,aa,X,O,G,Y,W,S,ab,t,E,B,F,K,j,z,H,k,e=M.table,q=M.parsers,N=b.debug(M,"core");
if(M.$tbodies=M.$table.children("tbody:not(."+M.cssInfoBlock+")"),X=void 0===J?M.$tbodies:J,M.cache={},M.totalRows=0,!q){return N?console.warn("Warning: *Empty table!* Not building a cache"):""
}for(N&&(S=new Date),M.showProcessing&&b.isProcessing(e,!0),aa=0;
aa<X.length;
aa++){for(B=[],ac=M.cache[aa]={normalized:[]},ab=X[aa]&&X[aa].rows.length||0,U=0;
U<ab;
++U){if(t={child:[],raw:[]},O=c(X[aa].rows[U]),G=[],!O.hasClass(M.selectorRemove.slice(1))){if(O.hasClass(M.cssChildRow)&&0!==U){for(H=ac.normalized.length-1,(E=ac.normalized[H][M.columns]).$row=E.$row.add(O),O.prev().hasClass(M.cssChildRow)||O.prev().addClass(b.css.cssHasChild),Y=O.children("th, td"),H=E.child.length,E.child[H]=[],K=0,z=M.columns,Z=0;
Z<z;
Z++){(W=Y[Z])&&(E.child[H][Z]=b.getParsedText(M,W,Z),(F=Y[Z].colSpan-1)>0&&(K+=F,z+=F)),K++
}}else{for(t.$row=O,t.order=U,K=0,z=M.columns,Z=0;
Z<z;
++Z){if((W=O[0].cells[Z])&&K<M.columns&&(!(j=void 0!==q[K])&&N&&console.warn("No parser found for row: "+U+", column: "+Z+'; cell containing: "'+c(W).text()+'"; does it have a header?'),Q=b.getElementText(M,W,K),t.raw[K]=Q,V=b.getParsedText(M,W,K,Q),G[K]=V,j&&"numeric"===(q[K].type||"").toLowerCase()&&(B[K]=Math.max(Math.abs(V)||0,B[K]||0)),(F=W.colSpan-1)>0)){for(k=0;
k<=F;
){V=M.duplicateSpan||0===k?Q:"string"!=typeof M.textExtraction?b.getElementText(M,W,K+k)||"":"",t.raw[K+k]=V,G[K+k]=V,k++
}K+=F,z+=F
}K++
}G[M.columns]=t,ac.normalized[ac.normalized.length]=G
}}}ac.colMax=B,M.totalRows+=ac.normalized.length
}if(M.showProcessing&&b.isProcessing(e),N){for(H=Math.min(5,M.cache[0].normalized.length),console[console.group?"group":"log"]("Building cache for "+M.totalRows+" rows (showing "+H+" rows in log) and "+M.columns+" columns"+b.benchmark(S)),Q={},Z=0;
Z<M.columns;
Z++){for(K=0;
K<H;
K++){Q["row: "+K]||(Q["row: "+K]={}),Q["row: "+K][M.$headerIndexed[Z].text()]=M.cache[0].normalized[K][Z]
}}console[console.table?"table":"log"](Q),console.groupEnd&&console.groupEnd()
}c.isFunction(P)&&P(e)
},getColumnText:function(t,x,q,J){var z,C,B,G,H,E,v,k,F,D,A="function"==typeof q,I="all"===x,e={raw:[],parsed:[],$cell:[]},j=(t=c(t)[0]).config;
if(!b.isEmptyObject(j)){for(H=j.$tbodies.length,z=0;
z<H;
z++){for(E=(B=j.cache[z].normalized).length,C=0;
C<E;
C++){G=B[C],J&&!G[j.columns].$row.is(J)||(D=!0,k=I?G.slice(0,j.columns):G[x],G=G[j.columns],v=I?G.raw:G.raw[x],F=I?G.$row.children():G.$row.children().eq(x),A&&(D=q({tbodyIndex:z,rowIndex:C,parsed:k,raw:v,$row:G.$row,$cell:F})),!1!==D&&(e.parsed[e.parsed.length]=k,e.raw[e.raw.length]=v,e.$cell[e.$cell.length]=F))
}}return e
}b.debug(j,"core")&&console.warn("No cache found - aborting getColumnText function!")
},setHeadersCss:function(e){var h,y,w=e.sortList,j=w.length,m=b.css.sortNone+" "+e.cssNone,k=[b.css.sortAsc+" "+e.cssAsc,b.css.sortDesc+" "+e.cssDesc],t=[e.cssIconAsc,e.cssIconDesc,e.cssIconNone],v=["ascending","descending"],q=function(g,d){g.removeClass(m).addClass(k[d]).attr("aria-sort",v[d]).find("."+b.css.icon).removeClass(t[2]).addClass(t[d])
},f=e.$table.find("tfoot tr").children("td, th").add(c(e.namespace+"_extra_headers")).removeClass(k.join(" ")),x=e.$headers.add(c("thead "+e.namespace+"_extra_headers")).removeClass(k.join(" ")).addClass(m).attr("aria-sort","none").find("."+b.css.icon).removeClass(t.join(" ")).end();
for(x.not(".sorter-false").find("."+b.css.icon).addClass(t[2]),e.cssIconDisabled&&x.filter(".sorter-false").find("."+b.css.icon).addClass(e.cssIconDisabled),h=0;
h<j;
h++){if(2!==w[h][1]){if(x=e.$headers.filter(function(l){for(var p=!0,g=e.$headers.eq(l),d=parseInt(g.attr("data-column"),10),r=d+b.getClosest(g,"th, td")[0].colSpan;
d<r;
d++){p=!!p&&(p||b.isValueInArray(d,e.sortList)>-1)
}return p
}),(x=x.not(".sorter-false").filter('[data-column="'+w[h][0]+'"]'+(1===j?":last":""))).length){for(y=0;
y<x.length;
y++){x[y].sortDisabled||q(x.eq(y),w[h][1])
}}f.length&&q(f.filter('[data-column="'+w[h][0]+'"]'),w[h][1])
}}for(j=e.$headers.length,h=0;
h<j;
h++){b.setColumnAriaLabel(e,e.$headers.eq(h))
}},getClosest:function(d,e){return c.fn.closest?d.closest(e):d.is(e)?d:d.parents(e).filter(":first")
},setColumnAriaLabel:function(h,j,g){if(j.length){var e=parseInt(j.attr("data-column"),10),k=h.sortVars[e],f=j.hasClass(b.css.sortAsc)?"sortAsc":j.hasClass(b.css.sortDesc)?"sortDesc":"sortNone",d=c.trim(j.text())+": "+b.language[f];
j.hasClass("sorter-false")||!1===g?d+=b.language.sortDisabled:(f=(k.count+1)%k.order.length,g=k.order[f],d+=b.language[0===g?"nextAsc":1===g?"nextDesc":"nextNone"]),j.attr("aria-label",d)
}},updateHeader:function(j){var h,k,g,d,l=j.table,f=j.$headers.length;
for(h=0;
h<f;
h++){g=j.$headers.eq(h),d=b.getColumnData(l,j.headers,h,!0),k="false"===b.getData(g,d,"sorter")||"false"===b.getData(g,d,"parser"),b.setColumnSort(j,g,k)
}},setColumnSort:function(g,d,f){var h=g.table.id;
d[0].sortDisabled=f,d[f?"addClass":"removeClass"]("sorter-false").attr("aria-disabled",""+f),g.tabIndex&&(f?d.removeAttr("tabindex"):d.attr("tabindex","0")),h&&(f?d.removeAttr("aria-controls"):d.attr("aria-controls",h))
},updateHeaderSortCount:function(e,h){var y,w,j,m,k,t,v,q,f=h||e.sortList,x=f.length;
for(e.sortList=[],m=0;
m<x;
m++){if(v=f[m],(y=parseInt(v[0],10))<e.columns){switch(e.sortVars[y].order||(q=b.getOrder(e.sortInitialOrder)?e.sortReset?[1,0,2]:[1,0]:e.sortReset?[0,1,2]:[0,1],e.sortVars[y].order=q,e.sortVars[y].count=0),q=e.sortVars[y].order,w=(""+v[1]).match(/^(1|d|s|o|n)/),w=w?w[0]:""){case"1":case"d":w=1;
break;
case"s":w=k||0;
break;
case"o":w=0===(t=q[(k||0)%q.length])?1:1===t?0:2;
break;
case"n":w=q[++e.sortVars[y].count%q.length];
break;
default:w=0
}k=0===m?w:k,j=[y,parseInt(w,10)||0],e.sortList[e.sortList.length]=j,w=c.inArray(j[1],q),e.sortVars[y].count=w>=0?w:j[1]%q.length
}}},updateAll:function(g,f,h){var d=g.table;
d.isUpdating=!0,b.refreshWidgets(d,!0,!0),b.buildHeaders(g),b.bindEvents(d,g.$headers,!0),b.bindMethods(g),b.commonUpdate(g,f,h)
},update:function(f,d,g){f.table.isUpdating=!0,b.updateHeader(f),b.commonUpdate(f,d,g)
},updateHeaders:function(f,d){f.table.isUpdating=!0,b.buildHeaders(f),b.bindEvents(f.table,f.$headers,!0),b.resortComplete(f,d)
},updateCell:function(e,k,E,C){if(c(k).closest("tr").hasClass(e.cssChildRow)){console.warn('Tablesorter Warning! "updateCell" for child row content has been disabled, use "update" instead')
}else{if(b.isEmptyObject(e.cache)){return b.updateHeader(e),void b.commonUpdate(e,E,C)
}e.table.isUpdating=!0,e.$table.find(e.selectorRemove).remove();
var q,w,v,A,B,y,j=e.$tbodies,D=c(k),z=j.index(b.getClosest(D,"tbody")),x=e.cache[z],t=b.getClosest(D,"tr");
if(k=D[0],j.length&&z>=0){if(v=j.eq(z).find("tr").not("."+e.cssChildRow).index(t),B=x.normalized[v],(y=t[0].cells.length)!==e.columns){for(A=0,q=!1,w=0;
w<y;
w++){q||t[0].cells[w]===k?q=!0:A+=t[0].cells[w].colSpan
}}else{A=D.index()
}q=b.getElementText(e,k,A),B[e.columns].raw[A]=q,q=b.getParsedText(e,k,A,q),B[A]=q,"numeric"===(e.parsers[A].type||"").toLowerCase()&&(x.colMax[A]=Math.max(Math.abs(q)||0,x.colMax[A]||0)),!1!==(q="undefined"!==E?E:e.resort)?b.checkResort(e,q,C):b.resortComplete(e,C)
}else{b.debug(e,"core")&&console.error("updateCell aborted, tbody missing or not within the indicated table"),e.table.isUpdating=!1
}}},addRows:function(v,A,t,L){var B,E,D,I,J,G,z,q,H,F,C,K,e,k="string"==typeof A&&1===v.$tbodies.length&&/<tr/.test(A||""),j=v.table;
if(k){A=c(A),v.$tbodies.append(A)
}else{if(!(A&&A instanceof c&&b.getClosest(A,"table")[0]===v.table)){return b.debug(v,"core")&&console.error("addRows method requires (1) a jQuery selector reference to rows that have already been added to the table, or (2) row HTML string to be added to a table with only one tbody"),!1
}}if(j.isUpdating=!0,b.isEmptyObject(v.cache)){b.updateHeader(v),b.commonUpdate(v,t,L)
}else{for(J=A.filter("tr").attr("role","row").length,D=v.$tbodies.index(A.parents("tbody").filter(":first")),v.parsers&&v.parsers.length||b.setupParsers(v),I=0;
I<J;
I++){for(H=0,z=A[I].cells.length,q=v.cache[D].normalized.length,C=[],F={child:[],raw:[],$row:A.eq(I),order:q},G=0;
G<z;
G++){K=A[I].cells[G],B=b.getElementText(v,K,H),F.raw[H]=B,E=b.getParsedText(v,K,H,B),C[H]=E,"numeric"===(v.parsers[H].type||"").toLowerCase()&&(v.cache[D].colMax[H]=Math.max(Math.abs(E)||0,v.cache[D].colMax[H]||0)),(e=K.colSpan-1)>0&&(H+=e),H++
}C[v.columns]=F,v.cache[D].normalized[q]=C
}b.checkResort(v,t,L)
}},updateCache:function(f,d,g){f.parsers&&f.parsers.length||b.setupParsers(f,g),b.buildCache(f,d,g)
},appendCache:function(v,f){var j,A,y,k,q,m,w,x=v.table,t=v.$tbodies,h=[],z=v.cache;
if(b.isEmptyObject(z)){return v.appender?v.appender(x,h):x.isUpdating?v.$table.triggerHandler("updateComplete",x):""
}for(b.debug(v,"core")&&(w=new Date),m=0;
m<t.length;
m++){if((y=t.eq(m)).length){for(k=b.processTbody(x,y,!0),A=(j=z[m].normalized).length,q=0;
q<A;
q++){h[h.length]=j[q][v.columns].$row,v.appender&&(!v.pager||v.pager.removeRows||v.pager.ajax)||k.append(j[q][v.columns].$row)
}b.processTbody(x,k,!1)
}}v.appender&&v.appender(x,h),b.debug(v,"core")&&console.log("Rebuilt table"+b.benchmark(w)),f||v.appender||b.applyWidget(x),x.isUpdating&&v.$table.triggerHandler("updateComplete",x)
},commonUpdate:function(f,d,g){f.$table.find(f.selectorRemove).remove(),b.setupParsers(f),b.buildCache(f),b.checkResort(f,d,g)
},initSort:function(e,k,F){if(e.table.isUpdating){return setTimeout(function(){b.initSort(e,k,F)
},50)
}var D,q,w,v,A,B,y,j=!F[e.sortMultiSortKey],E=e.table,z=e.$headers.length,x=b.getClosest(c(k),"th, td"),t=parseInt(x.attr("data-column"),10),C=e.sortVars[t].order;
if(x=x[0],e.$table.triggerHandler("sortStart",E),B=(e.sortVars[t].count+1)%C.length,e.sortVars[t].count=F[e.sortResetKey]?2:B,e.sortRestart){for(w=0;
w<z;
w++){y=e.$headers.eq(w),t!==(B=parseInt(y.attr("data-column"),10))&&(j||y.hasClass(b.css.sortNone))&&(e.sortVars[B].count=-1)
}}if(j){if(e.sortList=[],e.last.sortList=[],null!==e.sortForce){for(D=e.sortForce,q=0;
q<D.length;
q++){D[q][0]!==t&&(e.sortList[e.sortList.length]=D[q])
}}if((v=C[e.sortVars[t].count])<2&&(e.sortList[e.sortList.length]=[t,v],x.colSpan>1)){for(q=1;
q<x.colSpan;
q++){e.sortList[e.sortList.length]=[t+q,v],e.sortVars[t+q].count=c.inArray(v,C)
}}}else{if(e.sortList=c.extend([],e.last.sortList),b.isValueInArray(t,e.sortList)>=0){for(q=0;
q<e.sortList.length;
q++){(B=e.sortList[q])[0]===t&&(B[1]=C[e.sortVars[t].count],2===B[1]&&(e.sortList.splice(q,1),e.sortVars[t].count=-1))
}}else{if((v=C[e.sortVars[t].count])<2&&(e.sortList[e.sortList.length]=[t,v],x.colSpan>1)){for(q=1;
q<x.colSpan;
q++){e.sortList[e.sortList.length]=[t+q,v],e.sortVars[t+q].count=c.inArray(v,C)
}}}}if(e.last.sortList=c.extend([],e.sortList),e.sortList.length&&e.sortAppend&&(D=c.isArray(e.sortAppend)?e.sortAppend:e.sortAppend[e.sortList[0][0]],!b.isEmptyObject(D))){for(q=0;
q<D.length;
q++){if(D[q][0]!==t&&b.isValueInArray(D[q][0],e.sortList)<0){if(v=D[q][1],A=(""+v).match(/^(a|d|s|o|n)/)){switch(B=e.sortList[0][1],A[0]){case"d":v=1;
break;
case"s":v=B;
break;
case"o":v=0===B?1:0;
break;
case"n":v=(B+1)%C.length;
break;
default:v=0
}}e.sortList[e.sortList.length]=[D[q][0],v]
}}}e.$table.triggerHandler("sortBegin",E),setTimeout(function(){b.setHeadersCss(e),b.multisort(e),b.appendCache(e),e.$table.triggerHandler("sortBeforeEnd",E),e.$table.triggerHandler("sortEnd",E)
},1)
},multisort:function(u){var f,j,y,x,k=u.table,q=[],m=0,v=u.textSorter||"",w=u.sortList,t=w.length,h=u.$tbodies.length;
if(!u.serverSideSorting&&!b.isEmptyObject(u.cache)){if(b.debug(u,"core")&&(j=new Date),"object"==typeof v){for(y=u.columns;
y--;
){"function"==typeof(x=b.getColumnData(k,v,y))&&(q[y]=x)
}}for(f=0;
f<h;
f++){y=u.cache[f].colMax,u.cache[f].normalized.sort(function(d,g){var A,e,B,s,n,l,z;
for(A=0;
A<t;
A++){if(B=w[A][0],s=w[A][1],m=0===s,u.sortStable&&d[B]===g[B]&&1===t){return d[u.columns].order-g[u.columns].order
}if(e=/n/i.test(b.getSortType(u.parsers,B)),e&&u.strings[B]?(e="boolean"==typeof b.string[u.strings[B]]?(m?1:-1)*(b.string[u.strings[B]]?-1:1):u.strings[B]?b.string[u.strings[B]]||0:0,n=u.numberSorter?u.numberSorter(d[B],g[B],m,y[B],k):b["sortNumeric"+(m?"Asc":"Desc")](d[B],g[B],e,y[B],B,u)):(l=m?d:g,z=m?g:d,n="function"==typeof v?v(l[B],z[B],m,B,k):"function"==typeof q[B]?q[B](l[B],z[B],m,B,k):b["sortNatural"+(m?"Asc":"Desc")](d[B],g[B],B,u)),n){return n
}}return d[u.columns].order-g[u.columns].order
})
}b.debug(u,"core")&&console.log("Applying sort "+w.toString()+b.benchmark(j))
}},resortComplete:function(d,e){d.table.isUpdating&&d.$table.triggerHandler("updateComplete",d.table),c.isFunction(e)&&e(d.table)
},checkResort:function(f,g,e){var d=c.isArray(g)?g:f.sortList;
!1===(void 0===g?f.resort:g)||f.serverSideSorting||f.table.isProcessing?(b.resortComplete(f,e),b.applyWidget(f.table,!1)):d.length?b.sortOn(f,d,function(){b.resortComplete(f,e)
},!0):b.sortReset(f,function(){b.resortComplete(f,e),b.applyWidget(f.table,!1)
})
},sortOn:function(f,g,e,d){var h=f.table;
f.$table.triggerHandler("sortStart",h),b.updateHeaderSortCount(f,g),b.setHeadersCss(f),f.delayInit&&b.isEmptyObject(f.cache)&&b.buildCache(f),f.$table.triggerHandler("sortBegin",h),b.multisort(f),b.appendCache(f,d),f.$table.triggerHandler("sortBeforeEnd",h),f.$table.triggerHandler("sortEnd",h),b.applyWidget(h),c.isFunction(e)&&e(h)
},sortReset:function(e,f){e.sortList=[],b.setHeadersCss(e),b.multisort(e),b.appendCache(e);
var d;
for(d=0;
d<e.columns;
d++){e.sortVars[d].count=-1
}c.isFunction(f)&&f(e.table)
},getSortType:function(f,d){return f&&f[d]?f[d].type||"":""
},getOrder:function(d){return/^d/i.test(d)||1===d
},sortNatural:function(m,f){if(m===f){return 0
}m=m.toString(),f=f.toString();
var g,t,q,h,k,j,p=b.regex;
if(p.hex.test(f)){if(g=parseInt((m||"").match(p.hex),16),t=parseInt((f||"").match(p.hex),16),g<t){return -1
}if(g>t){return 1
}}for(g=(m||"").replace(p.chunk,"\\0$1\\0").replace(p.chunks,"").split("\\0"),t=(f||"").replace(p.chunk,"\\0$1\\0").replace(p.chunks,"").split("\\0"),j=Math.max(g.length,t.length),k=0;
k<j;
k++){if(q=isNaN(g[k])?g[k]||0:parseFloat(g[k])||0,h=isNaN(t[k])?t[k]||0:parseFloat(t[k])||0,isNaN(q)!==isNaN(h)){return isNaN(q)?1:-1
}if(typeof q!=typeof h&&(q+="",h+=""),q<h){return -1
}if(q>h){return 1
}}return 0
},sortNaturalAsc:function(h,g,j,f){if(h===g){return 0
}var d=b.string[f.empties[j]||f.emptyTo];
return""===h&&0!==d?"boolean"==typeof d?d?-1:1:-d||-1:""===g&&0!==d?"boolean"==typeof d?d?1:-1:d||1:b.sortNatural(h,g)
},sortNaturalDesc:function(h,g,j,f){if(h===g){return 0
}var d=b.string[f.empties[j]||f.emptyTo];
return""===h&&0!==d?"boolean"==typeof d?d?-1:1:d||1:""===g&&0!==d?"boolean"==typeof d?d?1:-1:-d||-1:b.sortNatural(g,h)
},sortText:function(f,d){return f>d?1:f<d?-1:0
},getTextValue:function(j,f,h){if(h){var k,g=j?j.length:0,d=h+f;
for(k=0;
k<g;
k++){d+=j.charCodeAt(k)
}return f*d
}return 0
},sortNumericAsc:function(j,h,k,g,d,l){if(j===h){return 0
}var f=b.string[l.empties[d]||l.emptyTo];
return""===j&&0!==f?"boolean"==typeof f?f?-1:1:-f||-1:""===h&&0!==f?"boolean"==typeof f?f?1:-1:f||1:(isNaN(j)&&(j=b.getTextValue(j,k,g)),isNaN(h)&&(h=b.getTextValue(h,k,g)),j-h)
},sortNumericDesc:function(j,h,k,g,d,l){if(j===h){return 0
}var f=b.string[l.empties[d]||l.emptyTo];
return""===j&&0!==f?"boolean"==typeof f?f?-1:1:f||1:""===h&&0!==f?"boolean"==typeof f?f?1:-1:-f||-1:(isNaN(j)&&(j=b.getTextValue(j,k,g)),isNaN(h)&&(h=b.getTextValue(h,k,g)),h-j)
},sortNumeric:function(f,d){return f-d
},addWidget:function(d){d.id&&!b.isEmptyObject(b.getWidgetById(d.id))&&console.warn('"'+d.id+'" widget was loaded more than once!'),b.widgets[b.widgets.length]=d
},hasWidget:function(d,e){return(d=c(d)).length&&d[0].config&&d[0].config.widgetInit[e]||!1
},getWidgetById:function(g){var f,h,d=b.widgets.length;
for(f=0;
f<d;
f++){if((h=b.widgets[f])&&h.id&&h.id.toLowerCase()===g.toLowerCase()){return h
}}},applyWidgetOptions:function(g){var h,f,d,j=g.config,e=j.widgets.length;
if(e){for(h=0;
h<e;
h++){(f=b.getWidgetById(j.widgets[h]))&&f.options&&(d=c.extend(!0,{},f.options),j.widgetOptions=c.extend(!0,d,j.widgetOptions),c.extend(!0,b.defaults.widgetOptions,f.options))
}}},addWidgetFromClass:function(j){var h,k,g=j.config,d="^"+g.widgetClass.replace(b.regex.templateName,"(\\S+)+")+"$",l=new RegExp(d,"g"),f=(j.className||"").split(b.regex.spaces);
if(f.length){for(h=f.length,k=0;
k<h;
k++){f[k].match(l)&&(g.widgets[g.widgets.length]=f[k].replace(l,"$1"))
}}},applyWidgetId:function(e,f,u){var t,h,k,j=(e=c(e)[0]).config,p=j.widgetOptions,q=b.debug(j,"core"),m=b.getWidgetById(f);
m&&(k=m.id,t=!1,c.inArray(k,j.widgets)<0&&(j.widgets[j.widgets.length]=k),q&&(h=new Date),!u&&j.widgetInit[k]||(j.widgetInit[k]=!0,e.hasInitialized&&b.applyWidgetOptions(e),"function"==typeof m.init&&(t=!0,q&&console[console.group?"group":"log"]("Initializing "+k+" widget"),m.init(e,m,j,p))),u||"function"!=typeof m.format||(t=!0,q&&console[console.group?"group":"log"]("Updating "+k+" widget"),m.format(e,j,p,!1)),q&&t&&(console.log("Completed "+(u?"initializing ":"applying ")+k+" widget"+b.benchmark(h)),console.groupEnd&&console.groupEnd()))
},applyWidget:function(e,h,w){var v,j,m,k,t,u=(e=c(e)[0]).config,q=b.debug(u,"core"),f=[];
if(!1===h||!e.hasInitialized||!e.isApplyingWidgets&&!e.isUpdating){if(q&&(t=new Date),b.addWidgetFromClass(e),clearTimeout(u.timerReady),u.widgets.length){for(e.isApplyingWidgets=!0,u.widgets=c.grep(u.widgets,function(d,g){return c.inArray(d,u.widgets)===g
}),j=(m=u.widgets||[]).length,v=0;
v<j;
v++){(k=b.getWidgetById(m[v]))&&k.id?(k.priority||(k.priority=10),f[v]=k):q&&console.warn('"'+m[v]+'" was enabled, but the widget code has not been loaded!')
}for(f.sort(function(g,d){return g.priority<d.priority?-1:g.priority===d.priority?0:1
}),j=f.length,q&&console[console.group?"group":"log"]("Start "+(h?"initializing":"applying")+" widgets"),v=0;
v<j;
v++){(k=f[v])&&k.id&&b.applyWidgetId(e,k.id,h)
}q&&console.groupEnd&&console.groupEnd()
}u.timerReady=setTimeout(function(){e.isApplyingWidgets=!1,c.data(e,"lastWidgetApplication",new Date),u.$table.triggerHandler("tablesorter-ready"),h||"function"!=typeof w||w(e),q&&(k=u.widgets.length,console.log("Completed "+(!0===h?"initializing ":"applying ")+k+" widget"+(1!==k?"s":"")+b.benchmark(t)))
},10)
}},removeWidget:function(j,m,h){var f,p,g,e,k=(j=c(j)[0]).config;
if(!0===m){for(m=[],e=b.widgets.length,g=0;
g<e;
g++){(p=b.widgets[g])&&p.id&&(m[m.length]=p.id)
}}else{m=(c.isArray(m)?m.join(","):m||"").toLowerCase().split(/[\s,]+/)
}for(e=m.length,f=0;
f<e;
f++){p=b.getWidgetById(m[f]),(g=c.inArray(m[f],k.widgets))>=0&&!0!==h&&k.widgets.splice(g,1),p&&p.remove&&(b.debug(k,"core")&&console.log((h?"Refreshing":"Removing")+' "'+m[f]+'" widget'),p.remove(j,k,k.widgetOptions,h),k.widgetInit[m[f]]=!1)
}k.$table.triggerHandler("widgetRemoveEnd",j)
},refreshWidgets:function(e,f,u){var t,h,k=(e=c(e)[0]).config.widgets,j=b.widgets,p=j.length,q=[],m=function(d){c(d).triggerHandler("refreshComplete")
};
for(t=0;
t<p;
t++){(h=j[t])&&h.id&&(f||c.inArray(h.id,k)<0)&&(q[q.length]=h.id)
}b.removeWidget(e,q.join(","),!0),!0!==u?(b.applyWidget(e,f||!1,m),f&&b.applyWidget(e,!1,m)):m(e)
},benchmark:function(d){return" ("+((new Date).getTime()-d.getTime())+" ms)"
},log:function(){console.log(arguments)
},debug:function(f,d){return f&&(!0===f.debug||"string"==typeof f.debug&&f.debug.indexOf(d)>-1)
},isEmptyObject:function(f){for(var d in f){return !1
}return !0
},isValueInArray:function(g,d){var f,h=d&&d.length||0;
for(f=0;
f<h;
f++){if(d[f][0]===g){return f
}}return -1
},formatFloat:function(e,f){if("string"!=typeof e||""===e){return e
}var d;
return e=(f&&f.config?!1!==f.config.usNumberFormat:void 0===f||f)?e.replace(b.regex.comma,""):e.replace(b.regex.digitNonUS,"").replace(b.regex.comma,"."),b.regex.digitNegativeTest.test(e)&&(e=e.replace(b.regex.digitNegativeReplace,"-$1")),d=parseFloat(e),isNaN(d)?c.trim(e):d
},isDigit:function(d){return isNaN(d)?b.regex.digitTest.test(d.toString().replace(b.regex.digitReplace,"")):""!==d
},computeColumnIndex:function(e,k){var E,C,q,w,v,A,B,y,j,D,z=k&&k.columns||0,x=[],t=new Array(z);
for(E=0;
E<e.length;
E++){for(A=e[E].cells,C=0;
C<A.length;
C++){for(B=E,y=(v=A[C]).rowSpan||1,j=v.colSpan||1,void 0===x[B]&&(x[B]=[]),q=0;
q<x[B].length+1;
q++){if(void 0===x[B][q]){D=q;
break
}}for(z&&v.cellIndex===D||(v.setAttribute?v.setAttribute("data-column",D):c(v).attr("data-column",D)),q=B;
q<B+y;
q++){for(void 0===x[q]&&(x[q]=[]),t=x[q],w=D;
w<D+j;
w++){t[w]="x"
}}}}return b.checkColumnCount(e,x,t.length),t.length
},checkColumnCount:function(j,f,h){var k,g,d=!0,l=[];
for(k=0;
k<f.length;
k++){if(f[k]&&(g=f[k].length,f[k].length!==h)){d=!1;
break
}}d||(j.each(function(o,m){var n=m.parentElement.nodeName;
l.indexOf(n)<0&&l.push(n)
}),console.error("Invalid or incorrect number of columns in the "+l.join(" or ")+"; expected "+h+", but found "+g+" columns"))
},fixColumnWidth:function(j){var m,h,f,p,g,e=(j=c(j)[0]).config,k=e.$table.children("colgroup");
if(k.length&&k.hasClass(b.css.colgroup)&&k.remove(),e.widthFixed&&0===e.$table.children("colgroup").length){for(k=c('<colgroup class="'+b.css.colgroup+'">'),m=e.$table.width(),p=(f=e.$tbodies.find("tr:first").children(":visible")).length,g=0;
g<p;
g++){h=parseInt(f.eq(g).width()/m*1000,10)/10+"%",k.append(c("<col>").css("width",h))
}e.$table.prepend(k)
}},getData:function(f,h,j){var g,d,k="",e=c(f);
return e.length?(g=!!c.metadata&&e.metadata(),d=" "+(e.attr("class")||""),void 0!==e.data(j)||void 0!==e.data(j.toLowerCase())?k+=e.data(j)||e.data(j.toLowerCase()):g&&void 0!==g[j]?k+=g[j]:h&&void 0!==h[j]?k+=h[j]:" "!==d&&d.match(" "+j+"-")&&(k=d.match(new RegExp("\\s"+j+"-([\\w-]+)"))[1]||""),c.trim(k)):""
},getColumnData:function(p,e,f,q,m){if("object"!=typeof e||null===e){return e
}var g,j=(p=c(p)[0]).config,h=m||j.$headers,k=j.$headerIndexed&&j.$headerIndexed[f]||h.find('[data-column="'+f+'"]:last');
if(void 0!==e[f]){return q?e[f]:e[h.index(k)]
}for(g in e){if("string"==typeof g&&k.filter(g).add(k.find(g)).length){return e[g]
}}},isProcessing:function(f,g,e){var d=(f=c(f))[0].config,h=e||f.find("."+b.css.header);
g?(void 0!==e&&d.sortList.length>0&&(h=h.filter(function(){return !this.sortDisabled&&b.isValueInArray(parseFloat(c(this).attr("data-column")),d.sortList)>=0
})),f.add(h).addClass(b.css.processing+" "+d.cssProcessing)):f.add(h).removeClass(b.css.processing+" "+d.cssProcessing)
},processTbody:function(d,f,g){if(d=c(d)[0],g){return d.isProcessing=!0,f.before('<colgroup class="tablesorter-savemyplace"/>'),c.fn.detach?f.detach():f.remove()
}var e=c(d).find("colgroup.tablesorter-savemyplace");
f.insertAfter(e),e.remove(),d.isProcessing=!1
},clearTableBody:function(d){c(d)[0].config.$tbodies.children().detach()
},characterEquivalents:{a:"áàâãäąå",A:"ÁÀÂÃÄĄÅ",c:"çćč",C:"ÇĆČ",e:"éèêëěę",E:"ÉÈÊËĚĘ",i:"íìİîïı",I:"ÍÌİÎÏ",o:"óòôõöō",O:"ÓÒÔÕÖŌ",ss:"ß",SS:"ẞ",u:"úùûüů",U:"ÚÙÛÜŮ"},replaceAccents:function(g){var f,h="[",d=b.characterEquivalents;
if(!b.characterRegex){b.characterRegexArray={};
for(f in d){"string"==typeof f&&(h+=d[f],b.characterRegexArray[f]=new RegExp("["+d[f]+"]","g"))
}b.characterRegex=new RegExp(h+"]")
}if(b.characterRegex.test(g)){for(f in d){"string"==typeof f&&(g=g.replace(b.characterRegexArray[f],f))
}}return g
},validateOptions:function(h){var j,g,e,k,f="headers sortForce sortList sortAppend widgets".split(" "),d=h.originalSettings;
if(d){b.debug(h,"core")&&(k=new Date);
for(j in d){if("undefined"===(e=typeof b.defaults[j])){console.warn('Tablesorter Warning! "table.config.'+j+'" option not recognized')
}else{if("object"===e){for(g in d[j]){e=b.defaults[j]&&typeof b.defaults[j][g],c.inArray(j,f)<0&&"undefined"===e&&console.warn('Tablesorter Warning! "table.config.'+j+"."+g+'" option not recognized')
}}}}b.debug(h,"core")&&console.log("validate options time:"+b.benchmark(k))
}},restoreHeaders:function(g){var h,f,d=c(g)[0].config,j=d.$table.find(d.selectorHeaders),e=j.length;
for(h=0;
h<e;
h++){(f=j.eq(h)).find("."+b.css.headerIn).length&&f.html(d.headerContent[h])
}},destroy:function(e,f,q){if((e=c(e)[0]).hasInitialized){b.removeWidget(e,!0,!1);
var p,g=c(e),j=e.config,h=g.find("thead:first"),k=h.find("tr."+b.css.headerRow).removeClass(b.css.headerRow+" "+j.cssHeaderRow),m=g.find("tfoot:first > tr").children("th, td");
!1===f&&c.inArray("uitheme",j.widgets)>=0&&(g.triggerHandler("applyWidgetId",["uitheme"]),g.triggerHandler("applyWidgetId",["zebra"])),h.find("tr").not(k).remove(),p="sortReset update updateRows updateAll updateHeaders updateCell addRows updateComplete sorton appendCache updateCache applyWidgetId applyWidgets refreshWidgets removeWidget destroy mouseup mouseleave "+"keypress sortBegin sortEnd resetToLoadState ".split(" ").join(j.namespace+" "),g.removeData("tablesorter").unbind(p.replace(b.regex.spaces," ")),j.$headers.add(m).removeClass([b.css.header,j.cssHeader,j.cssAsc,j.cssDesc,b.css.sortAsc,b.css.sortDesc,b.css.sortNone].join(" ")).removeAttr("data-column").removeAttr("aria-label").attr("aria-disabled","true"),k.find(j.selectorSort).unbind("mousedown mouseup keypress ".split(" ").join(j.namespace+" ").replace(b.regex.spaces," ")),b.restoreHeaders(e),g.toggleClass(b.css.table+" "+j.tableClass+" tablesorter-"+j.theme,!1===f),g.removeClass(j.namespace.slice(1)),e.hasInitialized=!1,delete e.config.cache,"function"==typeof q&&q(e),b.debug(j,"core")&&console.log("tablesorter has been removed")
}}};
c.fn.tablesorter=function(d){return this.each(function(){var f=this,e=c.extend(!0,{},b.defaults,d,b.instanceMethods);
e.originalSettings=d,!f.hasInitialized&&b.buildTable&&"TABLE"!==this.nodeName?b.buildTable(f,e):b.setup(f,e)
})
},window.console&&window.console.log||(b.logs=[],console={},console.log=console.warn=console.error=console.table=function(){var d=arguments.length>1?arguments:arguments[0];
b.logs[b.logs.length]={date:Date.now(),log:d}
}),b.addParser({id:"no-parser",is:function(){return !1
},format:function(){return""
},type:"text"}),b.addParser({id:"text",is:function(){return !0
},format:function(e,f){var d=f.config;
return e&&(e=c.trim(d.ignoreCase?e.toLocaleLowerCase():e),e=d.sortLocaleCompare?b.replaceAccents(e):e),e
},type:"text"}),b.regex.nondigit=/[^\w,. \-()]/g,b.addParser({id:"digit",is:function(d){return b.isDigit(d)
},format:function(e,f){var d=b.formatFloat((e||"").replace(b.regex.nondigit,""),f);
return e&&"number"==typeof d?d:e?c.trim(e&&f.config.ignoreCase?e.toLocaleLowerCase():e):e
},type:"numeric"}),b.regex.currencyReplace=/[+\-,. ]/g,b.regex.currencyTest=/^\(?\d+[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]|[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]\d+\)?$/,b.addParser({id:"currency",is:function(d){return d=(d||"").replace(b.regex.currencyReplace,""),b.regex.currencyTest.test(d)
},format:function(e,f){var d=b.formatFloat((e||"").replace(b.regex.nondigit,""),f);
return e&&"number"==typeof d?d:e?c.trim(e&&f.config.ignoreCase?e.toLocaleLowerCase():e):e
},type:"numeric"}),b.regex.urlProtocolTest=/^(https?|ftp|file):\/\//,b.regex.urlProtocolReplace=/(https?|ftp|file):\/\/(www\.)?/,b.addParser({id:"url",is:function(d){return b.regex.urlProtocolTest.test(d)
},format:function(d){return d?c.trim(d.replace(b.regex.urlProtocolReplace,"")):d
},type:"text"}),b.regex.dash=/-/g,b.regex.isoDate=/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/,b.addParser({id:"isoDate",is:function(d){return b.regex.isoDate.test(d)
},format:function(f){var d=f?new Date(f.replace(b.regex.dash,"/")):f;
return d instanceof Date&&isFinite(d)?d.getTime():f
},type:"numeric"}),b.regex.percent=/%/g,b.regex.percentTest=/(\d\s*?%|%\s*?\d)/,b.addParser({id:"percent",is:function(d){return b.regex.percentTest.test(d)&&d.length<15
},format:function(f,d){return f?b.formatFloat(f.replace(b.regex.percent,""),d):f
},type:"numeric"}),b.addParser({id:"image",is:function(g,d,f,h){return h.find("img").length>0
},format:function(d,e,f){return c(f).find("img").attr(e.config.imgAttr||"alt")||d
},parsed:!0,type:"text"}),b.regex.dateReplace=/(\S)([AP]M)$/i,b.regex.usLongDateTest1=/^[A-Z]{3,10}\.?\s+\d{1,2},?\s+(\d{4})(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?$/i,b.regex.usLongDateTest2=/^\d{1,2}\s+[A-Z]{3,10}\s+\d{4}/i,b.addParser({id:"usLongDate",is:function(d){return b.regex.usLongDateTest1.test(d)||b.regex.usLongDateTest2.test(d)
},format:function(f){var d=f?new Date(f.replace(b.regex.dateReplace,"$1 $2")):f;
return d instanceof Date&&isFinite(d)?d.getTime():f
},type:"numeric"}),b.regex.shortDateTest=/(^\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4})|(^\d{4}[\/\s]\d{1,2}[\/\s]\d{1,2})/,b.regex.shortDateReplace=/[\-.,]/g,b.regex.shortDateXXY=/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/,b.regex.shortDateYMD=/(\d{4})[\/\s](\d{1,2})[\/\s](\d{1,2})/,b.convertFormat=function(f,d){f=(f||"").replace(b.regex.spaces," ").replace(b.regex.shortDateReplace,"/"),"mmddyyyy"===d?f=f.replace(b.regex.shortDateXXY,"$3/$1/$2"):"ddmmyyyy"===d?f=f.replace(b.regex.shortDateXXY,"$3/$2/$1"):"yyyymmdd"===d&&(f=f.replace(b.regex.shortDateYMD,"$1/$2/$3"));
var g=new Date(f);
return g instanceof Date&&isFinite(g)?g.getTime():""
},b.addParser({id:"shortDate",is:function(d){return d=(d||"").replace(b.regex.spaces," ").replace(b.regex.shortDateReplace,"/"),b.regex.shortDateTest.test(d)
},format:function(j,h,k,g){if(j){var d=h.config,l=d.$headerIndexed[g],f=l.length&&l.data("dateFormat")||b.getData(l,b.getColumnData(h,d.headers,g),"dateFormat")||d.dateFormat;
return l.length&&l.data("dateFormat",f),b.convertFormat(j,f)||j
}return j
},type:"numeric"}),b.regex.timeTest=/^(0?[1-9]|1[0-2]):([0-5]\d)(\s[AP]M)$|^((?:[01]\d|[2][0-4]):[0-5]\d)$/i,b.regex.timeMatch=/(0?[1-9]|1[0-2]):([0-5]\d)(\s[AP]M)|((?:[01]\d|[2][0-4]):[0-5]\d)/i,b.addParser({id:"time",is:function(d){return b.regex.timeTest.test(d)
},format:function(h){var g,j=(h||"").match(b.regex.timeMatch),f=new Date(h),d=h&&(null!==j?j[0]:"00:00 AM"),k=d?new Date("2000/01/01 "+d.replace(b.regex.dateReplace,"$1 $2")):d;
return k instanceof Date&&isFinite(k)?(g=f instanceof Date&&isFinite(f)?f.getTime():0,g?parseFloat(k.getTime()+"."+f.getTime()):k.getTime()):h
},type:"numeric"}),b.addParser({id:"metadata",is:function(){return !1
},format:function(e,g,h){var f=g.config,d=f.parserMetadataName?f.parserMetadataName:"sortValue";
return c(h).metadata()[d]
},type:"numeric"}),b.addWidget({id:"zebra",priority:90,format:function(x,e,h){var y,w,j,m,k,u,v,q=new RegExp(e.cssChildRow,"i"),f=e.$tbodies.add(c(e.namespace+"_extra_table").children("tbody:not(."+e.cssInfoBlock+")"));
for(k=0;
k<f.length;
k++){for(j=0,v=(y=f.eq(k).children("tr:visible").not(e.selectorRemove)).length,u=0;
u<v;
u++){w=y.eq(u),q.test(w[0].className)||j++,m=j%2==0,w.removeClass(h.zebra[m?1:0]).addClass(h.zebra[m?0:1])
}}},remove:function(k,j,m,h){if(!h){var f,p,g=j.$tbodies,d=(m.zebra||["even","odd"]).join(" ");
for(f=0;
f<g.length;
f++){(p=b.processTbody(k,g.eq(f),!0)).children().removeClass(d),b.processTbody(k,p,!1)
}}}})
}(a),a.tablesorter
});
/*!
 * Blog js
 * Version: 1.1
 */
;
var fdc=fdc||{};
fdc.blog=fdc.blog||{};
fdc.blog.tabClickHandler=function(a){var j=$(this),c=j.hasClass("tab")?j:j.closest(".tab"),d=c.index(),f=j.closest(".blog-right-rail"),g=f.find(".tab"),h=f.find(".section"),e=$(f.find(".section")[d]),b=$(".blog-resources .grid-33-right");
g.not(c).removeClass("open");
h.not(e).removeClass("open");
c.toggleClass("open");
if(d==0&&b.length>0){b.toggleClass("open")
}else{b.removeClass("open");
e.toggleClass("open")
}};
fdc.blog.initCheckboxes=function(){var a=$("input[name=blogThreatResearchBlog]"),b=$("input[name=subscriptionBlogProduct]"),c=$("input[name=blogExecutivePerspective]");
if(a.length>0&&location.href.indexOf("threat-research")>0){a.prop("checked",true)
}else{if(b.length>0&&location.href.indexOf("products-and-services")>0){b.prop("checked",true)
}else{if(c.length>0&&location.href.indexOf("executive-perspective")>0){c.prop("checked",true)
}}}if(!(a.length>0||b.length>0||c.length>0)){console.log("No checkboxes present.")
}};
fdc.blog.replaceFormWithThankYou=function(b){fdc.blog.thankYouHeader=fdc.blog.thankYouHeader||"Thank you for subscribing";
fdc.blog.thankYouParagraph=fdc.blog.thankYouParagraph||"You will receive emails as new content is posted.";
var a=b.getFormElem()[0],c=document.createElement("DIV");
c.className="c00";
c.innerHTML='<h3 class="reverse">'+fdc.blog.thankYouHeader+"</h3><p>"+fdc.blog.thankYouParagraph+"</p>";
a.parentNode.removeChild(a.parentNode.childNodes[0]);
a.parentNode.replaceChild(c,a);
return false
};
$(document).ready(function(){jQuery(".blog-right-rail .tab").click(fdc.blog.tabClickHandler)
});
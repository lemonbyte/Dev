/**
 * Sanoma Media Consent Manager
 * 
 * This is a dummy file, used for testing purposes
 * 
 * Copyright 2012, Sanoma Media B.V.
 */
var Consent = (function() {

	var COOKIE_NAME = 'site_consent';
	var OPTIN_HOST = 'privacy.sanomamedia.nl/site';
	var PREFERENCES_URL = 'privacy.sanomamedia.nl/preferences';
	var LAST_MODIFIED = new Date(2012,10,22,12,12,33);
	var GROUP = 'all';
	var SITE = 'test.nl';
	var CATEGORIES = ['social', 'ads', 'stats', 'interests', 'stir', 'atinternet'];
	
	Consent = function() {
		this.get_site = function() {
			return SITE;
		}
		this.get_preferences_url = function() {
			var source = window.location.href;
			var protocol = window.location.protocol;
			return protocol+'//'+PREFERENCES_URL+'?origin='+encodeURIComponent(source);
		}
		this.cookies_enabled = function() {
			var cookieEnabled = (navigator.cookieEnabled) ? true : false;
			if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) { 
				document.cookie="testcookie";
				cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
				var exprires = (new Date(2000,1,1,1,1,1)).toGMTString();
				document.cookie="testcookie=; expires="+expires+"; path=/"
			}
			return (cookieEnabled);
		}
		this.get_cookie = function() {
			var nameEQ = COOKIE_NAME + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) {
					return decodeURIComponent(c.substring(nameEQ.length,c.length))
				}
			}
			return null;
		}
		this.is_valid = function() {
			// The dummy does not validate
			return true
		}
		this.validate = function() {
			if(!this.is_valid() && this.cookies_enabled()) {
				this.get_consent()
			}
			return this;
		}
		this.get_consent = function() {
			// the dummy does not get consent
		}
		this.get_optins = function() {
			var cookie = this.get_cookie();
			if (cookie) {

				var components = cookie.split(':')
				if(components.length==4) {
				return components;

	        // var quote = "";
	        // for (var i = 0; i < components.length; i++){
	        //     quote += components[i] + " ";
	        // }
	        // return quote;

				}
				return [];
			}
			// if no cookie return all optins during transition period
			return CATEGORIES;
		}
		this.has_optin = function(category) {
			var categories = this.get_optins();
			//console.log(categories);
			//console.log(category);
			
			for(var i=0;i<categories.length;i++) {
				//console.log(categories[i]);
				if(categories[i]==category) {
					return true;
				}
			}
			return false;
		}

		this.uncomment = function(html) {
			var html = html.replace(/^\s+|\s+$/g, '')
			var start = html.indexOf('<!--')
			var end = html.indexOf('-->')
			if(start > -1 && end > -1) {
				return html.substr(start+4, end-start-4)
			}
			return html
		}
		this.render = function() {
			for(var i=0;i<CATEGORIES.length;i++) {
				var category = CATEGORIES[i];
				if (this.has_optin(category)) {
					var className = 'optin-'+category;
				} else {
					var className = 'optout-'+category;
				}
				var elements = getElementsByClassName(className);
				for (var n=0;n<elements.length;n++) {
					var el = elements[n];
					el.innerHTML = this.uncomment(el.innerHTML)
				}
			}
		}
		return this;
	}
	
	/*
		getElementsByClassName
		Developed by Robert Nyman, http://www.robertnyman.com
		Code/licensing: http://code.google.com/p/getelementsbyclassname/
	*/	
	var getElementsByClassName = function (className, tag, elm){
		if (document.getElementsByClassName) {
			getElementsByClassName = function (className, tag, elm) {
				elm = elm || document;
				var elements = elm.getElementsByClassName(className),
					nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
					returnElements = [],
					current;
				for(var i=0, il=elements.length; i<il; i+=1){
					current = elements[i];
					if(!nodeName || nodeName.test(current.nodeName)) {
						returnElements.push(current);
					}
				}
				return returnElements;
			};
		}
		else if (document.evaluate) {
			getElementsByClassName = function (className, tag, elm) {
				tag = tag || "*";
				elm = elm || document;
				var classes = className.split(" "),
					classesToCheck = "",
					xhtmlNamespace = "http://www.w3.org/1999/xhtml",
					namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
					returnElements = [],
					elements,
					node;
				for(var j=0, jl=classes.length; j<jl; j+=1){
					classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
				}
				try	{
					elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
				}
				catch (e) {
					elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
				}
				while ((node = elements.iterateNext())) {
					returnElements.push(node);
				}
				return returnElements;
			};
		}
		else {
			getElementsByClassName = function (className, tag, elm) {
				tag = tag || "*";
				elm = elm || document;
				var classes = className.split(" "),
					classesToCheck = [],
					elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
					current,
					returnElements = [],
					match;
				for(var k=0, kl=classes.length; k<kl; k+=1){
					classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
				}
				for(var l=0, ll=elements.length; l<ll; l+=1){
					current = elements[l];
					match = false;
					for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
						match = classesToCheck[m].test(current.className);
						if (!match) {
							break;
						}
					}
					if (match) {
						returnElements.push(current);
					}
				}
				return returnElements;
			};
		}
		return getElementsByClassName(className, tag, elm);
	};
	
	return (new Consent()).validate();
})();
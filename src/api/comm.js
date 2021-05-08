export function comm () {

	let param, url = location.href, theRequest = {};
	if(location.href.indexOf('isappinstalled')>-1 || location.href.indexOf('singlemessage')>-1){
			let index = location.href.indexOf('?from=')
			let prevUrl = location.href.split('#')[0].substr(0,index)
			let nextUrl = location.href.split('#')[1]
			let url1 = prevUrl+'#'+nextUrl
			url = url1
	}
	if (url.indexOf("?") != -1) {
	let _index = url.indexOf("?")+1
		let str = url.substr(_index);
		let strs = str.split("&");
		for (let i = 0, len = strs.length; i < len; i++) {
			param = strs[i].split("=");
			theRequest[param[0]] = decodeURIComponent(param[1]);
		}
	}
	return theRequest;
}
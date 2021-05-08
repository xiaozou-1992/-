// const testno= (value)=>{
// 	let str = value.toString()
// 	return `${str.substring(0,2)}**${str.substring(str.length-2)}`
// }
// const testname= (value)=>{
// 	let str = value.toString()
// 	if (str.length < 3) {
// 		return `${str.substring(0,1)}**`
// 	} else {
// 		return `${str.substring(0,1)}*${str.substring(str.length-1)}`
// 	}
// }

 export function testno(value){
	 let str = value.toString()
	 return `${str.substring(0,str.length-4)}**${str.substring(str.length-2)}`
 }
 
 export function testname(value){
 		let str = value.toString()
 		if (str.length < 3) {
 			return `${str.substring(0,1)}*`
 		} else {
 			return `${str.substring(0,1)}*${str.substring(str.length-1)}`
 		}
 }
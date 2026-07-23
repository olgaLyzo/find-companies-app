export function decodeToken(token:string){
	const payload = token.split('.')[1];

	const decoded = JSON.parse(
		atob(payload)
	);

	return decoded;
}
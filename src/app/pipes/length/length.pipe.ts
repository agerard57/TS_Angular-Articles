import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "length",
})
export class LengthPipe implements PipeTransform {
	transform(value: string) {
		return value.length;
	}
}

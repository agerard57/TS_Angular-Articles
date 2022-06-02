import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "empty",
})

// It means that:
// 1- The value is not empty or only filled with whitespace
// 		--> it returns itself
// 2- The value is empty or only filled with whitespace
// 		--> It returns "n/a"

export class EmptyPipe implements PipeTransform {
	transform(value: string) {
		return !value || /^\s*$/.test(value) ? "n/a" : value
	}
}

import { LengthPipe } from "./length.pipe";

describe("LengthPipe", () => {
	let pipe: LengthPipe;

	beforeEach(() => {
		pipe = new LengthPipe();
	});

	it("Should return 0", () => {
		expect(pipe.transform("")).toEqual(0);
	});

	it("Should return the length (5)", () => {
		expect(pipe.transform("aaaaa")).toEqual(5);
	});
});

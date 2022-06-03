import { TruncatePipe } from "./truncate.pipe";

describe("TruncatePipe", () => {
	let pipe: TruncatePipe;

	beforeEach(() => {
		pipe = new TruncatePipe();
	});

	it("Should truncate", () => {
		expect(pipe.transform("Hello World", 5)).toEqual("Hello...");
	});

	it("Should preserve the whole input", () => {
		expect(pipe.transform("Hello", 10)).toEqual("Hello");
	});
});

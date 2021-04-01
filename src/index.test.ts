import Gitlab from "./";

describe("unit | Gitlab", () => {
	it("find project objects", async () => {
		const gitlab = Gitlab({
			token: "abcdefg"
		});
		try {
			const projects = await gitlab.Projects.user({ userId: "704" });
			console.log(projects);
			console.log(projects.length);
			expect(projects).toBeTruthy();
		} catch (error) {
			console.error(error);
		}
	});
});

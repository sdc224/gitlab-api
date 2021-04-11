import Gitlab from "./";
// import credential from "../private/credential.json";

describe("unit | Gitlab", () => {
	it("find project objects", async () => {
		// const gitlab = Gitlab(credential);
		const gitlab = Gitlab({ token: "abcdef" });
		try {
			jest.setTimeout(50000);
			const projects = await gitlab.Projects.user({ userId: "704" });
			console.log(projects);
			console.log(projects.length);
			expect(projects).toBeTruthy();
		} catch (error) {
			console.error(error);
		}
		jest.setTimeout(5000);
	});
});

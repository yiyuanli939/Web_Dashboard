import sites from "@/data/sites";

describe("sites config", () => {
  it("contains at least one site", () => {
    expect(sites.length).toBeGreaterThan(0);
  });

  it("every site has required fields", () => {
    for (const site of sites) {
      expect(site.name).toBeTruthy();
      expect(site.url).toBeTruthy();
      expect(site.description).toBeTruthy();
      expect(Array.isArray(site.tags)).toBe(true);
      expect(typeof site.vibecoded).toBe("boolean");
      expect(site.image).toBeTruthy();
    }
  });

  it("every site URL is a valid URL", () => {
    for (const site of sites) {
      expect(() => new URL(site.url)).not.toThrow();
    }
  });

  it("has no duplicate URLs", () => {
    const urls = sites.map((s) => s.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("has no duplicate names", () => {
    const names = sites.map((s) => s.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("includes the personal website", () => {
    const personal = sites.find((s) =>
      s.url.includes("yiyuanli939.github.io/Personal-Website")
    );
    expect(personal).toBeDefined();
  });
});

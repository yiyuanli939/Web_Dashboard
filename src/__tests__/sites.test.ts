import sites from "@/data/sites";

describe("sites config", () => {
  it("contains at least one site", () => {
    expect(sites.length).toBeGreaterThan(0);
  });

  it("every site has required fields", () => {
    for (const site of sites) {
      expect(site.name.en).toBeTruthy();
      expect(site.name.cn).toBeTruthy();
      expect(site.url).toBeTruthy();
      expect(site.description.en).toBeTruthy();
      expect(site.description.cn).toBeTruthy();
      expect(Array.isArray(site.tags)).toBe(true);
      expect(typeof site.vibecoded).toBe("boolean");
      expect(site.image).toBeTruthy();
      expect(site.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
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
    const namesEn = sites.map((s) => s.name.en);
    const namesCn = sites.map((s) => s.name.cn);
    expect(new Set(namesEn).size).toBe(namesEn.length);
    expect(new Set(namesCn).size).toBe(namesCn.length);
  });

  it("includes the personal website", () => {
    const personal = sites.find((s) =>
      s.url.includes("yiyuanli939.github.io/Personal-Website")
    );
    expect(personal).toBeDefined();
  });
});

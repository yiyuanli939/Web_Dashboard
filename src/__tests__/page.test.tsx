import { render, screen, fireEvent } from "@testing-library/react";
import Home from "@/app/page";
import sites from "@/data/sites";

describe("Home page", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("renders a screenshot image for every site", () => {
    for (const site of sites) {
      const imgs = screen.getAllByAltText(`Screenshot of ${site.name.en}`);
      expect(imgs.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("renders the dashboard heading in English by default", () => {
    expect(
      screen.getByRole("heading", { name: /chris li.*website dashboard/i })
    ).toBeInTheDocument();
  });

  it("renders the intro paragraph", () => {
    expect(
      screen.getByText(/a collection of websites and projects/i)
    ).toBeInTheDocument();
  });

  it("renders a card for every site in the config", () => {
    for (const site of sites) {
      expect(screen.getByText(site.name.en)).toBeInTheDocument();
    }
  });

  it("each card links to the correct URL with target _blank", () => {
    for (const site of sites) {
      const link = screen.getByText(site.name.en).closest("a");
      expect(link).toHaveAttribute("href", site.url);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("renders tags for each site", () => {
    const allTags = sites.flatMap((s) => s.tags);
    for (const tag of new Set(allTags)) {
      const elements = screen.getAllByText(tag);
      const expectedCount = allTags.filter((t) => t === tag).length;
      expect(elements.length).toBe(expectedCount);
    }
  });

  it("shows last updated date for each site", () => {
    const dateElements = screen.getAllByText(/\d{4}-\d{2}-\d{2}/);
    expect(dateElements.length).toBe(sites.length);
  });

  it("renders the footer", () => {
    expect(screen.getByText(/deployed on vercel/i)).toBeInTheDocument();
  });
});

describe("Language toggle", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("renders EN and CN language buttons", () => {
    expect(screen.getByRole("button", { name: "EN" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "CN" })).toBeInTheDocument();
  });

  it("switches to Chinese when CN is clicked", () => {
    fireEvent.click(screen.getByRole("button", { name: "CN" }));
    expect(
      screen.getByRole("heading", { name: /李熠远的网站仪表板/ })
    ).toBeInTheDocument();
    for (const site of sites) {
      expect(screen.getByText(site.description.cn)).toBeInTheDocument();
    }
  });

  it("switches back to English when EN is clicked", () => {
    fireEvent.click(screen.getByRole("button", { name: "CN" }));
    fireEvent.click(screen.getByRole("button", { name: "EN" }));
    expect(
      screen.getByRole("heading", { name: /chris li/i })
    ).toBeInTheDocument();
  });
});

describe("Filtering", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("renders All, Vibecoded, and Handcoded filter buttons", () => {
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Vibecoded" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Handcoded" })
    ).toBeInTheDocument();
  });

  it("filters to only vibecoded sites", () => {
    fireEvent.click(screen.getByRole("button", { name: "Vibecoded" }));

    const vibecoded = sites.filter((s) => s.vibecoded);
    const nonVibecoded = sites.filter((s) => !s.vibecoded);

    for (const site of vibecoded) {
      expect(screen.getByText(site.name.en)).toBeInTheDocument();
    }
    for (const site of nonVibecoded) {
      expect(screen.queryByText(site.name.en)).not.toBeInTheDocument();
    }
  });

  it("filters to only non-vibecoded sites", () => {
    fireEvent.click(screen.getByRole("button", { name: "Handcoded" }));

    const vibecoded = sites.filter((s) => s.vibecoded);
    const nonVibecoded = sites.filter((s) => !s.vibecoded);

    for (const site of nonVibecoded) {
      expect(screen.getByText(site.name.en)).toBeInTheDocument();
    }
    for (const site of vibecoded) {
      expect(screen.queryByText(site.name.en)).not.toBeInTheDocument();
    }
  });

  it("shows all sites again when All is clicked", () => {
    fireEvent.click(screen.getByRole("button", { name: "Vibecoded" }));
    fireEvent.click(screen.getByRole("button", { name: "All" }));

    for (const site of sites) {
      expect(screen.getByText(site.name.en)).toBeInTheDocument();
    }
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import Home from "@/app/page";
import sites from "@/data/sites";

describe("Home page", () => {
  it("renders a screenshot image for every site", () => {
    for (const site of sites) {
      const imgs = screen.getAllByAltText(`Screenshot of ${site.name}`);
      expect(imgs.length).toBeGreaterThanOrEqual(1);
    }
  });

  beforeEach(() => {
    render(<Home />);
  });

  it("renders the dashboard heading", () => {
    expect(
      screen.getByRole("heading", { name: /chris.* website dashboard/i })
    ).toBeInTheDocument();
  });

  it("renders the intro paragraph", () => {
    expect(
      screen.getByText(/a collection of websites and projects/i)
    ).toBeInTheDocument();
  });

  it("renders a card for every site in the config", () => {
    for (const site of sites) {
      expect(screen.getByText(site.name)).toBeInTheDocument();
    }
  });

  it("each card links to the correct URL with target _blank", () => {
    for (const site of sites) {
      const link = screen.getByText(site.name).closest("a");
      expect(link).toHaveAttribute("href", site.url);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("renders tags for each site", () => {
    for (const site of sites) {
      for (const tag of site.tags) {
        expect(screen.getByText(tag)).toBeInTheDocument();
      }
    }
  });

  it("shows a Vibecoded badge on vibecoded sites", () => {
    const vibecoded = sites.filter((s) => s.vibecoded);
    const badges = screen.getAllByText(/vibecoded/i);
    // filter buttons also contain the word, so badge count >= vibecoded sites
    expect(badges.length).toBeGreaterThanOrEqual(vibecoded.length);
  });

  it("renders the footer", () => {
    expect(screen.getByText(/deployed on vercel/i)).toBeInTheDocument();
  });
});

describe("Filtering", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("renders All, Vibecoded, and Other filter buttons", () => {
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Vibecoded" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Handcoded" })).toBeInTheDocument();
  });

  it("filters to only vibecoded sites", () => {
    fireEvent.click(screen.getByRole("button", { name: "Vibecoded" }));

    const vibecoded = sites.filter((s) => s.vibecoded);
    const nonVibecoded = sites.filter((s) => !s.vibecoded);

    for (const site of vibecoded) {
      expect(screen.getByText(site.name)).toBeInTheDocument();
    }
    for (const site of nonVibecoded) {
      expect(screen.queryByText(site.name)).not.toBeInTheDocument();
    }
  });

  it("filters to only non-vibecoded sites", () => {
    fireEvent.click(screen.getByRole("button", { name: "Handcoded" }));

    const vibecoded = sites.filter((s) => s.vibecoded);
    const nonVibecoded = sites.filter((s) => !s.vibecoded);

    for (const site of nonVibecoded) {
      expect(screen.getByText(site.name)).toBeInTheDocument();
    }
    for (const site of vibecoded) {
      expect(screen.queryByText(site.name)).not.toBeInTheDocument();
    }
  });

  it("shows all sites again when All is clicked", () => {
    fireEvent.click(screen.getByRole("button", { name: "Vibecoded" }));
    fireEvent.click(screen.getByRole("button", { name: "All" }));

    for (const site of sites) {
      expect(screen.getByText(site.name)).toBeInTheDocument();
    }
  });
});

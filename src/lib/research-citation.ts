import type { ResearchPaperSharedData } from '@/data/research-types';

type ResearchCitation = ResearchPaperSharedData['citation'];

/** Builds the same clean, plain-text citation shown in every research paper. */
export function formatResearchCitation(citation: ResearchCitation) {
  return `${citation.authors} (${citation.year}). ${citation.title}. ${citation.publication}. doi:${citation.doi}`;
}

/** Keeps Clipboard API failures inside the citation control rather than surfacing browser errors. */
export async function copyResearchCitation(citationText: string) {
  try {
    await navigator.clipboard.writeText(citationText);
    return true;
  } catch {
    return false;
  }
}

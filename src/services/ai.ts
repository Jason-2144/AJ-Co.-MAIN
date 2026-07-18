export interface AIServiceResponse {
  content: string;
  tokensUsed?: number;
  success: boolean;
}

export const aiService = {
  async generateProposal(companyName: string, projectScope: string): Promise<AIServiceResponse> {
    // Future: Integrate Gemini Client
    // const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    // const response = await ai.models.generateContent({ ... });
    
    // Stub response
    const mockProposal = `
PROPOSAL FOR ${companyName.toUpperCase()}
=========================================
Scope: ${projectScope}

1. EXECUTIVE SUMMARY
AJ & Co. will build high-converting web systems and configure custom AI workflow automation pipelines to automate repetitive operational tasks.

2. TIMELINE & MILESTONES
- Milestone 1: Requirement Mapping & Architecture Blueprint (Weeks 1-2)
- Milestone 2: Core Development & Integration Hooks (Weeks 3-6)
- Milestone 3: Security Hardening & Edge Optimization (Weeks 7-8)

3. PROJECT FEES
Custom project budget structures will map directly to defined invoicing schedules.
    `.trim();

    return {
      content: mockProposal,
      success: true
    };
  },

  async summarizeMeeting(rawNotes: string): Promise<AIServiceResponse> {
    const mockSummary = `
MEETING SUMMARY & KEY TAKEAWAYS
================================
Based on notes: "${rawNotes.substring(0, 60)}..."

- Action Item 1: Map DNS and verify domain redirects under Vercel configuration.
- Action Item 2: Complete task Kanban board items and update task assignees.
- Action Item 3: Validate billing invoice line items and convert active quote draft.
    `.trim();

    return {
      content: mockSummary,
      success: true
    };
  },

  async draftEmail(recipient: string, subjectType: string, customDetails: string): Promise<AIServiceResponse> {
    const mockEmail = `
Subject: Update regarding your project - AJ & Co.

Dear ${recipient},

I hope you are well.

Regarding the ${subjectType} updates:
${customDetails}

Please let us know if you have any questions or require modifications.

Best regards,
The AJ & Co. Team
    `.trim();

    return {
      content: mockEmail,
      success: true
    };
  }
};

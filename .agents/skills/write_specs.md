# Project VOTE: Voter Scenarios Logic Specifications

This document defines the core logical pathways for the three distinct voter scenarios in the "Interactive Civic Path" web solution. The application acts as a personalized guide to the election process, altering its content and progression based on the user's identified scenario.

## Scenario 1: First-Time Voters
**Goal:** Educate users on the fundamentals of the electoral process, focusing on registration and key deadlines.

**User Flow:**
1. **Onboarding:** User selects "First-Time Voter" from the initial prompt.
2. **Eligibility Check:** Quick visual interaction to confirm age and citizenship status.
3. **Registration Timeline:**
    - Displays a step-by-step path detailing how to register in their state.
    - Highlights critical deadlines (e.g., 30 days before the election).
4. **Primary vs. General:** An interactive visual explainer differentiating between primary elections and the general election.
5. **Call to Action (CTA):** "Start Your Registration" (links to state-specific portal).

**Data Needs:** State-by-state registration deadlines, primary/general dates.

## Scenario 2: State-to-State Relocators
**Goal:** Guide users through the process of updating their voter registration after a move, emphasizing state-specific variations.

**User Flow:**
1. **Onboarding:** User selects "Recently Moved" from the initial prompt.
2. **State Selection:** User inputs their previous state and current state.
3. **Difference Engine:** Highlights the key differences in voting laws between the two states (e.g., early voting availability, ID requirements).
4. **Update Timeline:**
    - Step-by-step path on how to cancel previous registration (if necessary) and register in the new state.
    - Emphasizes the residency requirement duration for the new state.
5. **Call to Action (CTA):** "Update Registration Now."

**Data Needs:** State-by-state voting rules (ID requirements, early voting dates, residency requirements).

## Scenario 3: Real-Time Ballot Information Seekers
**Goal:** Provide users with immediate, actionable information regarding their upcoming ballot and polling locations.

**User Flow:**
1. **Onboarding:** User selects "Upcoming Election Info" from the initial prompt.
2. **Location Input:** User enters their zip code or address.
3. **Practice Ballot:**
    - An interactive module simulating their actual upcoming ballot.
    - Users can tap to learn more about specific candidates or measures.
4. **Polling Location:** Displays the nearest polling place or drop-box location on a stylized map interface.
5. **Civic Score Dashboard:** A personalized dashboard updating their "Civic Score" based on interactions (e.g., viewing the practice ballot adds points).

**Data Needs:** Real-time localized ballot data (e.g., via Google Civic Information API or mock data), polling location data.

## AI Assistant Integration
- A floating "Assistant Orb" is present across all scenarios.
- It proactively offers context-sensitive help (e.g., "Need help finding your state's ID requirements?").
- Users can query it for real-time election FAQs.

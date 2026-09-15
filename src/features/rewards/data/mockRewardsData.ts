import { RewardsProfile } from '../types';

/**
 * Stand-in for the rewards API. Shaped the way the real endpoint response is expected to look
 * (`GET /me/rewards`) so swapping this for a real fetch later is a one-file change.
 */
export const mockRewardsProfile: RewardsProfile = {
  points: 120,
  milestones: [
    {
      id: 'add-50-contacts',
      title: 'Add 50 Contacts',
      icon: 'people',
      points: 50,
      status: 'in-progress',
      subtitle: '48 of 50 contacts added',
      howTo:
        'Add contacts from your networking events or meetings. Each new contact you save counts toward this milestone.',
      progressCurrent: 48,
      progressTarget: 50,
    },
    {
      id: 'login-streak-7',
      title: '7-Day Login Streak',
      icon: 'flame',
      points: 30,
      status: 'in-progress',
      subtitle: '5 of 7 days',
      howTo: 'Open All Buddy at least once a day. Streaks reset if you miss a day.',
      progressCurrent: 5,
      progressTarget: 7,
    },
    {
      id: 'contacts-marked-helpful-10',
      title: '10 Contacts Marked Helpful',
      icon: 'thumbsUp',
      points: 100,
      status: 'in-progress',
      subtitle: '6 of 10 marked helpful',
      howTo:
        'When a contact you add turns out to be a useful lead, the person above you in your organisation can mark that contact as Helpful from their CRM. Each one counts toward this milestone.',
      progressCurrent: 6,
      progressTarget: 10,
    },
    {
      id: 'add-100-contacts',
      title: 'Add 100 Contacts',
      icon: 'people',
      points: 150,
      status: 'in-progress',
      subtitle: '48 of 100 contacts added',
      howTo:
        'Add contacts from your networking events or meetings. Each new contact you save counts toward this milestone.',
      progressCurrent: 48,
      progressTarget: 100,
    },
    {
      id: 'first-login',
      title: 'First Login',
      icon: 'flame',
      points: 10,
      status: 'completed',
      subtitle: 'Welcome bonus',
      howTo: 'Awarded automatically the first time you sign in.',
      completedOn: '2026-09-15',
    },
    {
      id: 'first-contact-added',
      title: 'First Contact Added',
      icon: 'people',
      points: 20,
      status: 'completed',
      subtitle: 'Added your first contact',
      howTo: 'Awarded automatically when you save your first contact.',
      completedOn: '2026-09-15',
    },
    {
      id: 'add-10-contacts',
      title: 'Add 10 Contacts',
      icon: 'people',
      points: 40,
      status: 'completed',
      subtitle: '10 of 10 contacts added',
      howTo: 'Awarded automatically once you have 10 saved contacts.',
      completedOn: '2026-09-15',
    },
    {
      id: 'first-contact-marked-helpful',
      title: 'First Contact Marked Helpful',
      icon: 'thumbsUp',
      points: 25,
      status: 'completed',
      subtitle: 'A superior flagged your contact as a useful lead',
      howTo: 'Awarded automatically the first time one of your contacts is marked Helpful.',
      completedOn: '2026-09-15',
    },
  ],
};

/** In-progress milestones sorted nearest-to-completion first, matching the design's ordering rule. */
export function sortByProgress(milestones: RewardsProfile['milestones']) {
  return [...milestones]
    .filter((m) => m.status === 'in-progress')
    .sort((a, b) => {
      const aPct = (a.progressCurrent ?? 0) / (a.progressTarget ?? 1);
      const bPct = (b.progressCurrent ?? 0) / (b.progressTarget ?? 1);
      return bPct - aPct;
    });
}

/** Completed milestones, most recently earned first. */
export function sortByRecency(milestones: RewardsProfile['milestones']) {
  return [...milestones]
    .filter((m) => m.status === 'completed')
    .sort((a, b) => (b.completedOn ?? '').localeCompare(a.completedOn ?? ''));
}

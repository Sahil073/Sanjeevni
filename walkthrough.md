# Walkthrough: Correct Onboarding Flow Sequence

We updated the sequence so that the **Health Onboarding Form** appears **after sign up** and **before connecting the wearable device**.

---

## The Corrected User Journey

```
┌───────────────────────────┐
│ 1. Welcome Screen         │  (/onboarding)
│    "Get Started"          │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│ 2. Sign Up                │  (/(auth)/sign-up)
│    Email & Password / SSO │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│ 3. Health Onboarding Form │  (/onboarding-health)
│    Age, Gender, Height,   │
│    Weight, Blood Group,   │
│    Medical Conditions     │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│ 4. Connect Wearable Device│  (/connect-device)
│    BLE Bluetooth Pairing  │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│ 5. Home Dashboard         │  (/(tabs))
└───────────────────────────┘
```

---

## Changes Made

1. **[`src/app/onboarding.tsx`](file:///c:/Users/LENOVO/Desktop/vibing/src/app/onboarding.tsx)**:
   - Tapping **"Get Started"** routes to sign-up (`/(auth)/sign-up`).
   - If a user is already signed in but has not completed their health profile, automatically resumes at `/onboarding-health`.

2. **[`src/app/(auth)/sign-up.tsx`](file:///c:/Users/LENOVO/Desktop/vibing/src/app/%28auth%29/sign-up.tsx)**:
   - Upon successful email verification or social authentication, new accounts are immediately routed to `/onboarding-health`.

3. **[`src/app/onboarding-health.tsx`](file:///c:/Users/LENOVO/Desktop/vibing/src/app/onboarding-health.tsx)**:
   - Captures all 6 metrics (Age, Gender, Height, Weight, Blood Group, Medical Condition).
   - Tapping **"Complete & Connect Wearable"** saves the profile in secure offline storage and advances to `/connect-device`.
   - Back button on Step 1 cleanly navigates back to `/(auth)/sign-up`.

4. **[`src/app/index.tsx`](file:///c:/Users/LENOVO/Desktop/vibing/src/app/index.tsx)**:
   - Unauthenticated users ➔ `/onboarding`.
   - Authenticated users with incomplete health profiles ➔ `/onboarding-health`.
   - Authenticated users with completed health profiles ➔ `/(tabs)`.

---

## Verification Results

- **TypeScript Compilation**:
  ```bash
  npm run typecheck  # Passed with 0 errors
  ```
- **ESLint**:
  ```bash
  npm run lint       # Passed with 0 errors, 0 warnings
  ```

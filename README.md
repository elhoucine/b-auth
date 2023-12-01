# Introduction
This document outlines the technical choices and other improvements made in the development process.

## Technical Choices

### Tracking

I opted for [trackingJS](https://trackingjs.com/) for face detection due to its straightforward API and well-documented examples. Its simplicity allowed me to tackle this challenge more efficiently.

However, some drawbacks were identified:
- Lack of an official npm module, which could be addressed by creating a wrapper.
- Face detection precision could be improved by exploring API options and combining with other tracking features like eyes and nose.

In a real-world scenario, I would conduct thorough testing and benchmarking of available solutions, comparing face detection capabilities, precision, device support, community engagement, and API features to choose the most suitable one for the project.

### Camera

Initially, I used an NPM module called `react_webcam`, a wrapper for the Camera API. This choice aimed to focus on the tracking part and ensure its functionality.

Once face detection was successful, I replaced `react_webcam` with a custom component interacting directly with the Camera API, aligning with the challenge requirements.

The Camera component has a single responsibility: to display and handle user Camera interactions.

### Notifications

For displaying disappearing notifications in login success/failure, I utilized [`react-toastify`](https://github.com/fkhadra/react-toastify). This library was chosen for its efficient notification handling and extensive customization options.

### Displaying Hello World

State management was employed to display different screens instead of implementing routing between pages. A full router seemed excessive for this use case, but in more complex real-world scenarios, a routing system might be a better choice.

### SPA

Opting for a Single Page App (SPA) was suitable since the page's rendering requirements were minimal, and the use of the Camera API did not benefit significantly from server rendering.

### Testing

Given the non-requirement for unit testing in this challenge, I focused on feature development. If required, I would prioritize testing the following cases:

**Camera component:**
- Handling camera permission denial.
- Correct rendering.

**Tracking:**
- Script loading and readiness updates.
- Correct method calls for tracking.

**Login:**
- Handling login success.
- Handling login failure.

## Architectural Decisions

## What Could I Have Done with More Time

Depending on the provided requirements, additional elements could be considered:
- Comparative benchmarking of different tracking libraries/methods.
- Enhancements to face detection:
    - Ability to allow or disallow multiple faces for login.
    - User prompts for different facial expressions to verify real faces.
    - Inclusion of various tests to assess tracking precision.
    - Implementation of face registration and login.
- Inclusion of unit and integration tests.
- Improved user experience:
    - Visual feedback (success/failure) on the Camera frame.
    - Highlighting face parts as they are being detected.
- Consideration of GDPR alignment.

## Splitting Work into Reviewable Sub-Tasks in a Real-World Environment

In a real-world environment, breaking down this task into reviewable sub-tasks could follow this structure:

1. **Technical Document:**
   - Researching face tracking solutions and methods.
   - Testing a few solutions and running benchmarks.
   - Presenting and discussing findings with the team.

2. **Camera:**
   - Integration of a reusable Camera component with basic capabilities.
   - Features include displaying a camera, handling permissions, and recording screenshots.

3. **Tracking:**
   - Development of a face tracking module with essential APIs for face detection on the user camera.

4. **Login Component:**
   - Handling login success, failure, and redirection.
   - Initially developed with a fake API and later connected to the actual use case.

5. **Face Detection:**
   - Integration of all components into a cohesive, functional feature.

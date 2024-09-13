# React + Vite
live demo: https://customer-labs-gules.vercel.app/
# SaveSegmentPopup Component

## Overview

The `SaveSegmentPopup` component is a React functional component that provides a popup interface for saving a segment with a customizable list of schemas. It utilizes GSAP for smooth animations and transitions when adding or removing schemas and when opening or closing the popup.

## Features

- **Popup Interface**: A modal popup for saving a segment with user-defined schemas.
- **Schema Management**: Add and remove schemas dynamically with smooth GSAP animations.
- **State Management**: Manage state for selected schemas, available schemas, and segment name.
- **Form Submission**: Send segment data to a specified webhook URL via a POST request.

## Installation

To use this component in your project, follow these steps:

1. **Install Dependencies**:
   Ensure you have `react`, `react-dom`, and `gsap` installed. If not, you can install them using:

   ```bash
   npm install gsap

Add the Component: Import and use the SaveSegmentPopup component in your application as shown below:

javascript
Copy code
import SaveSegmentPopup from './path/to/SaveSegmentPopup';

function App() {
  return (
    <div>
      <SaveSegmentPopup />
    </div>
  );
}

export default App;
Usage
Open the Popup: Click the "Save Segment" button to open the popup.

Add Schema: Use the dropdown menu to add schemas to the segment. You can add predefined schemas or use the "+ Add new schema" button to add a new schema.

Remove Schema: Click the "Remove" button next to a schema to remove it from the list. The schema will be animated out of view using GSAP.

Submit: Click "Save the Segment" to submit the form data to the webhook URL.

Cancel: Click "Cancel" to close the popup without saving.

Props
This component does not accept any props directly. It manages its internal state and animation via useState and useRef hooks.

Dependencies
gsap: For animations and transitions.
react: For building the user interface.
react-dom: For rendering the component.
Development
Local Development: To run this component locally, ensure you have a React development environment set up.
Testing: Test animations and functionality by interacting with the popup in your local development server.

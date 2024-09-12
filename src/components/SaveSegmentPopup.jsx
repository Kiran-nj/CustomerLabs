import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const schemaOptions = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' },
];

const SaveSegmentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableSchemas, setAvailableSchemas] = useState([...schemaOptions]);

  const popupRef = useRef(null);
  const formElementsRef = useRef([]);
  const schemaContainerRef = useRef([]);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        popupRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' }
      );
      gsap.fromTo(
        formElementsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }
      );
    }
  }, [isOpen]);

  const handleAddSchema = (newSchema) => {
    setSelectedSchemas((prevSchemas) => [...prevSchemas, newSchema]);
    setAvailableSchemas(
      availableSchemas.filter((schema) => schema.value !== newSchema.value)
    );
  };

  useEffect(() => {
    if (selectedSchemas.length > 0) {
      const lastSchemaIndex = selectedSchemas.length - 1;
      gsap.fromTo(
        schemaContainerRef.current[lastSchemaIndex],
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }
      );
    }
  }, [selectedSchemas]);

  const handleRemoveSchema = (indexToRemove) => {
    // Perform animation on the element to be removed
    gsap.to(schemaContainerRef.current[indexToRemove], {
      opacity: 0,
      x: 50,
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => {
        // Update state after animation is complete
        setSelectedSchemas((prevSchemas) =>
          prevSchemas.filter((_, index) => index !== indexToRemove)
        );
        setAvailableSchemas((prevSchemas) => [
          ...prevSchemas,
          selectedSchemas[indexToRemove],
        ]);
      },
    });
  };

  const handleSubmit = () => {
    const data = {
      segment_name: segmentName,
      schema: selectedSchemas.map((schema) => ({ [schema.value]: schema.label })),
    };

    // Using a sample webhook URL 
    const webhookUrl = 'https://webhook.site/3cae6b9a-6291-4b6e-94b2-c9a58b8d8a74';

    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Successfully sent data:', result);
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });

    console.log('Submitted Data:', data);
  };

  return (
    <div className="font-sans">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-105"
      >
        Save Segment
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-start justify-center pt-10">
          <div
            ref={popupRef}
            className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold mb-4">Save Segment</h2>

            <label className="block mb-2">Enter the Name of the Segment</label>
            <input
              type="text"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              placeholder="Name of the segment"
              className="w-full p-2 mb-4 border rounded"
              ref={(el) => (formElementsRef.current[0] = el)}
            />

            <div className="flex items-center space-x-6 bg-gray-100 p-4 rounded-lg shadow-md mb-4">
              <h1 className="flex items-center space-x-2 text-lg font-semibold">
                <span className="bg-green-500 rounded-full h-4 w-4 transform transition-transform duration-300 hover:scale-125"></span>
                <span className="text-gray-800">User Traits</span>
              </h1>
              <h1 className="flex items-center space-x-2 text-lg font-semibold">
                <span className="bg-red-500 rounded-full h-4 w-4 transform transition-transform duration-300 hover:scale-125"></span>
                <span className="text-gray-800">Group Traits</span>
              </h1>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              {selectedSchemas.map((schema, index) => (
                <div
                  key={index}
                  className="flex items-center mb-2"
                  ref={(el) => (schemaContainerRef.current[index] = el)}
                >
                  <select
                    value={schema.value}
                    onChange={(e) => {
                      const newSchema = availableSchemas.find(
                        (s) => s.value === e.target.value
                      );
                      if (newSchema) {
                        const updatedSchemas = [...selectedSchemas];
                        updatedSchemas[index] = newSchema;
                        setSelectedSchemas(updatedSchemas);
                        setAvailableSchemas(
                          schemaOptions.filter(
                            (schemaOption) =>
                              !updatedSchemas.find((s) => s.value === schemaOption.value)
                          )
                        );
                      }
                    }}
                    className="flex-grow p-2 mr-2 border rounded"
                    ref={(el) => (formElementsRef.current[index + 1] = el)}
                  >
                    {[schema, ...availableSchemas].map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleRemoveSchema(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition duration-300 transform hover:scale-105"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <select
              onChange={(e) => {
                const newSchema = availableSchemas.find(
                  (schema) => schema.value === e.target.value
                );
                if (newSchema) handleAddSchema(newSchema);
              }}
              defaultValue=""
              className="w-full p-2 mb-4 border rounded"
              ref={(el) => (formElementsRef.current[selectedSchemas.length + 1] = el)}
            >
              <option value="" disabled>
                Add schema to segment
              </option>
              {availableSchemas.map((schema) => (
                <option key={schema.value} value={schema.value}>
                  {schema.label}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                const newSchema = availableSchemas[0];
                if (newSchema) handleAddSchema(newSchema);
              }}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4 transition duration-300 transform hover:scale-105"
              ref={(el) => (formElementsRef.current[selectedSchemas.length + 2] = el)}
            >
              + Add new schema
            </button>

            <div className="flex justify-end space-x-4">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-105"
                ref={(el) => (formElementsRef.current[selectedSchemas.length + 3] = el)}
              >
                Save the Segment
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SaveSegmentPopup;
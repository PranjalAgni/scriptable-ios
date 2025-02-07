/** @jsxImportSource https://esm.sh/react@18.2.0 */
import { createRoot } from "https://esm.sh/react-dom@18.2.0/client";
import React, { useEffect, useState } from "https://esm.sh/react@18.2.0";

const config = {
  URL: "https://pranjaldotdev-cfwod.web.val.run/",
};

interface WodDetails {
  time: string;
  exercises: string[];
  scaling: string[];
}

interface WodData {
  data?: {
    rx: WodDetails;
    intermediate: WodDetails;
    beginner: WodDetails;
  };
}

type WorkoutScale = "rx" | "intermediate" | "beginner";

function WorkoutCard() {
  const [loading, setLoading] = useState(false);
  const [rawWodData, setRawWodData] = useState("");
  const [cleanWodData, setCleanWodData] = useState<WodData>({});
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutScale>("rx");

  useEffect(() => {
    async function fetcher() {
      try {
        setLoading(true);
        const data = await fetchWorkout();
        setRawWodData(data);
      } catch (error) {
        console.error("Failed fetching wod ", error);
      } finally {
        setLoading(false);
      }
    }

    fetcher();
  }, []);

  useEffect(() => {
    const sanatizedWodDetails = parseCompleteWorkout(rawWodData);
    setCleanWodData(sanatizedWodDetails);
  }, [rawWodData]);

  // effect to update the
  // useEffect(() => {
  //   //
  // }, [cleanWodData, selectedWorkout])

  const currentWorkout = cleanWodData?.data?.[selectedWorkout] as WodDetails;

  if (loading || !currentWorkout) {
    return <div>Working on it.....🏋️🏋️🏋️</div>;
  }

  return (
    <div className="workout-card">
      <div className="workout-header">
        <h1>Crossfit WOD 🏋️🏋️🏋️</h1>
        <p className="workout-time">{currentWorkout.time}</p>
      </div>

      <div className="workout-level-selector">
        <select
          value={selectedWorkout}
          onChange={(e) => setSelectedWorkout(e.target.value as WorkoutScale)}
          className="workout-dropdown"
        >
          {["rx", "intermediate", "beginner"].map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <div className="workout-exercises">
        {currentWorkout?.exercises.map((exercise, index) => (
          <div key={index} className="exercise-line">
            <span className="exercise-bullet">•</span>
            <span
              dangerouslySetInnerHTML={{ __html: boldifyMarkdown(exercise) }}
            ></span>
          </div>
        ))}
      </div>

      <div className="workout-scaling">
        <div className="scaling-content">
          {currentWorkout?.scaling.map((scale, idx) => (
            <pre
              className="scaling-details"
              key={idx}
              dangerouslySetInnerHTML={{ __html: boldifyMarkdown(scale) }}
            ></pre>
          ))}
        </div>
      </div>

      <footer>
        <a
          href={import.meta.url.replace("esm.town", "val.town")}
          target="_top"
          className="source-link"
        >
          View Workout Source
        </a>
      </footer>
    </div>
  );
}

function App() {
  return (
    <div className="workout-container">
      <WorkoutCard />
    </div>
  );
}

function client() {
  createRoot(document.getElementById("root")!).render(<App />);
}
if (typeof document !== "undefined") {
  client();
}

export default async function server(request: Request): Promise<Response> {
  return new Response(
    `
    <html>
      <head>
        <title>Workout of the Day</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>${css}</style>
      </head>
      <body>
        <div id="root"></div>
        <script src="https://esm.town/v/std/catch"></script>
        <script type="module" src="${import.meta.url}"></script>
      </body>
    </html>
  `,
    {
      headers: { "content-type": "text/html" },
    }
  );
}

const css = `
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #f4f6f9;
  margin: 0;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.workout-container {
  width: 100%;
  max-width: 600px;
}

.workout-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  padding: 30px;
  text-align: left;
}

.workout-header {
  border-bottom: 2px solid #f1f3f5;
  padding-bottom: 15px;
  margin-bottom: 20px;
}

.workout-header h1 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.8em;
}

.workout-time {
  color: #7f8c8d;
  margin-top: 10px;
  font-style: italic;
}

.workout-level-selector {
  margin-bottom: 20px;
}

.workout-dropdown {
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e4e8;
  border-radius: 6px;
  background-color: #f1f3f5;
  color: #2c3e50;
  font-size: 1em;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 50%;
  border: 1px solid #dfdfdf;
  border-radius: 2px;
  margin-right: 2rem;
  padding: 1rem;
  padding-right: 2rem;
}

.workout-exercises {
  margin-bottom: 20px;
}

.exercise-line {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: #34495e;
}

.exercise-bullet {
  color: #3498db;
  margin-right: 10px;
  font-weight: bold;
}

.workout-scaling {
  background-color: #f1f3f5;
  border-radius: 8px;
  padding: 15px;
}

.scaling-details {
  color: #2c3e50;
  margin: 0;
  white-space: pre-wrap;
  font-family: inherit;
}

.source-link {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #bdc3c7;
  text-decoration: none;
  font-size: 0.9em;
}
`;

// --- Fetch workout from crossfit.com ---
async function fetchWorkout(): Promise<string> {
  const response = await fetch(config.URL);
  const body = (await response.json()) as any;
  return body.data as string;
}

// --- Split the raw text into sections ---
function parseCompleteWorkout(rawText: string): WodData {
  // Define markers for the Intermediate and Beginner options.
  const intermediateMarker = "**Intermediate option:**";
  const beginnerMarker = "**Beginner option:**";

  // Locate the marker positions.
  const intermediateIndex = rawText.indexOf(intermediateMarker);
  const beginnerIndex = rawText.indexOf(beginnerMarker);

  // For the RX option (unlabeled), assume its block is at the very top up until the Intermediate marker.
  // We also assume that any additional commentary (e.g., "Post reps to comments.") is after a double newline.
  let rxBlockFull = rawText.substring(0, intermediateIndex).trim();
  // Take only the first “paragraph” (text before the first double newline) as the workout block.
  const rxParts = rxBlockFull.split("\n\n");
  const rxWorkoutText = rxParts[0].trim();

  // Extract the Intermediate block (text between the Intermediate and Beginner markers).
  const intermediateWorkoutText = rawText
    .substring(intermediateIndex + intermediateMarker.length, beginnerIndex)
    .trim();

  // Extract the Beginner block (text after the Beginner marker).
  const beginnerWorkoutText = rawText
    .substring(beginnerIndex + beginnerMarker.length)
    .trim();

  // Parse each block to extract time, exercises, and scaling.
  const rxData = parseWorkoutBlock(rxWorkoutText);
  const intermediateData = parseWorkoutBlock(intermediateWorkoutText);
  const beginnerData = parseWorkoutBlock(beginnerWorkoutText);

  // --- Build the desired JSON structure ---
  const result = {
    data: {
      rx: rxData,
      intermediate: intermediateData,
      beginner: beginnerData,
    },
  };

  // Output the result as a formatted JSON string.
  // console.log(JSON.stringify(result, null, 4));
  return result;
}

// --- Helper function to parse a workout block ---
function parseWorkoutBlock(blockText: string) {
  // Split block text into lines and trim each one
  const lines = blockText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");

  // Find the first line that does not start with '*'
  let time = "";
  let timeIndex = 0;
  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].startsWith("*")) {
      time = lines[i];
      timeIndex = i;
      break;
    }
  }

  // If no suitable time is found, default to the first line.
  if (!time) {
    time = lines[0] || "";
    timeIndex = 0;
  }

  // Prepare arrays to collect exercises and scaling lines.
  let exercises = [];
  let scaling = [];
  let reachedScaling = false;

  // Process the lines after the time line.
  for (let i = timeIndex + 1; i < lines.length; i++) {
    // As soon as a line starts with ♀ or ♂, assume scaling block is reached.
    if (/^(♀|♂)/.test(lines[i])) {
      scaling.push(lines[i]);
      // Since scaling data is always 2 lines, try to extract the next line as well.
      if (i + 1 < lines.length) {
        scaling.push(lines[i + 1]);
      }
      break; // Exit after grabbing 2 scaling lines.
    } else {
      exercises.push(lines[i]);
    }
  }

  return { time, exercises, scaling };
}

function boldifyMarkdown(text: string) {
  // This regex finds any text between two pairs of '**' and replaces it with <strong> tags.
  return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
}

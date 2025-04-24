import { ToolCall, TpaServer, TpaSession } from '@augmentos/sdk';
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const PACKAGE_NAME = process.env.PACKAGE_NAME;
const API_KEY = process.env.API_KEY;
import path from 'path';
import { setupExpressRoutes } from './webview';
import { handleToolCall } from './tools';

class RemindersTPA extends TpaServer {
  constructor() {
    if (!PACKAGE_NAME || !API_KEY) {
      throw new Error("PACKAGE_NAME and API_KEY must be set");
    }
    super({
      packageName: PACKAGE_NAME,
      apiKey: API_KEY,
      port: PORT,
      publicDir: path.join(__dirname, '../public'),
    });

    // Set up Express routes
    setupExpressRoutes(this);
  }

  private userSessionsMap = new Map<string, TpaSession>();


  protected async onToolCall(toolCall: ToolCall): Promise<string | undefined> {
    return handleToolCall(toolCall, toolCall.userId, this.userSessionsMap.get(toolCall.userId));
  }

  protected async onSession(session: TpaSession, sessionId: string, userId: string): Promise<void> {
    this.userSessionsMap.set(userId, session);

    // Show welcome message
    session.layouts.showTextWall("Example App loaded!");

    // listen for transcriptions
    const transcriptionHandler = session.events.onTranscription((data) => {
      if (data.isFinal) {
        // Handle transcription text
        console.log("Transcript received:", data.text);
      } else {
        // Preliminary transcription
      }
    });
    // automatically remove the transcription handler when the session ends
    this.addCleanupHandler(transcriptionHandler);

    // listen for errors
    const errorHandler = session.events.onError((error) => {
      console.error('Error:', error);
      this.userSessionsMap.delete(userId);
    });
    // automatically remove the error handler when the session ends
    this.addCleanupHandler(errorHandler);

    // automatically remove the session when the session ends
    this.addCleanupHandler(() => {
      this.userSessionsMap.delete(userId);
    });
  }
}

// Start the server
const app = new RemindersTPA();

app.start().catch(console.error);
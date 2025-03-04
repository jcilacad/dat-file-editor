# DAT File Editor

This is a web-based application designed to edit `.dat` files. It offers an intuitive interface for uploading, viewing, editing, and downloading `.dat` files. Built with a Next.js frontend and a backend API, the application includes features like search functionality, theme switching, a sticky table header, and responsive design for an enhanced user experience.

## Prerequisites

Before you begin, ensure you have the following installed:

- **[Node.js](https://nodejs.org/)** (version 14 or higher)
- **[npm](https://www.npmjs.com/)** (version 6 or higher)

## Installation

Follow these steps to set up the project locally:

### Clone the Repository

```bash
git clone https://github.com/yourusername/dat-file-editor.git
cd dat-file-editor
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

1. Create a `.env.local` file in the root directory.
2. Add any required environment variables (e.g., API keys or backend endpoints). Example:

```plaintext
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Running the Application

To launch the application locally:

### Start the Development Server

```bash
npm run dev
```

### Access the Application

Open your browser and go to [http://localhost:3000](http://localhost:3000).

## Features

The DAT File Editor comes with the following features:

- **Upload and Download**: Easily upload `.dat` files and download edited versions.
- **Edit Cells**: Click on any table cell to modify its contents directly.
- **Search Functionality**: Search within the table, with matching cells highlighted and the first match scrolled into view.
- **Theme Support**: Toggle between light and dark modes for comfortable viewing.
- **Sticky Header**: The table header stays fixed while scrolling through large datasets.
- **Responsive Design**: Adapts seamlessly to various screen sizes, from desktop to mobile.

## Backend API Endpoints

The application relies on the following backend API endpoints:

- `GET /api/data`: Retrieves the current `.dat` file data.
- `POST /api/upload`: Uploads a new `.dat` file to the server.
- `POST /api/update`: Updates the data rows based on edits made in the frontend.
- `GET /api/download`: Downloads the current data as a `.dat` file.

## Usage

### Upload a File

1. Click the **Upload File** button.
2. Choose a `.dat` file from your local system.
3. The file contents will load into an editable table.

### Edit Cells

- Click any cell in the table to edit its value.
- Changes are stored in the application state automatically.

### Save Changes

- Click the **Save** button to send updates to the backend.

### Download the File

- Click the **Download** button to retrieve the edited `.dat` file.

### Search

1. Type a query into the search input field.
2. Press **Enter** or click **Search** to highlight matching cells.
3. The table will scroll to the first matching cell.

### Switch Themes

- Use the **Dark Mode** or **Light Mode** button to toggle between themes.

## Contributing

We welcome contributions to improve the DAT File Editor! To contribute, follow these steps:

1. **Fork the repository**.
2. **Create a new branch**:

   ```bash
   git checkout -b feature/your-feature
   ```

3. **Make your changes**.
4. **Commit your changes**:

   ```bash
   git commit -am 'Add your feature'
   ```

5. **Push to your branch**:

   ```bash
   git push origin feature/your-feature
   ```

6. **Submit a Pull Request via GitHub**.

Thank you for your interest in the project!

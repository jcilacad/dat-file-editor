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
git clone https://github.com/jcilacad/dat-file-editor.git
cd dat-file-editor
```

### Install Dependencies

```bash
npm install
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

## Sample Table Structure

### Unmodified DAT File

```
"First_Name"|"Middle_Name"|"Last_Name"|"Transaction_Type"|"Transaction_Amount"|"Transaction_Date"|"Currency"|"Bank_Account"|"Payment_Method"|"Check_Number"|"Bank_Reference"|"Customer_Reference"|"Details"|"Indicator"|"Account_Info"|"Receipt_ID"|"Source_Account"|"Surcharge"|"Card_Type"|"File_Name"|"Account_Holder"|"Masked_Card"|"Sequence_No"
"John"|"A."|"Doe"|"Purchase"|"150.00"|"2024-02-25"|"USD"|"ACC-123"|"EFT"|""|"REF-9876"|"CUST-001"|"Item Purchase"|"N"|""|"567890"|""|""|"MasterCard"|"OriginalFile_20240304.DAT"|"Jane Smith"|"5678****1234"|"1"
"Emily"|"C."|"Johnson"|"Purchase"|"320.00"|"2024-03-05"|"USD"|"ACC-789"|"EFT"|""|"REF-5678"|"CUST-003"|"Subscription Payment"|"N"|""|"789012"|""|""|"Visa"|"EditedFile_20240304.DAT"|"Sarah Lee"|"9012****3456"|"2"
"David"|"D."|"Brown"|"Purchase"|"500.00"|"2024-03-06"|"GBP"|"ACC-654"|"Credit Card"|""|"REF-4321"|"CUST-004"|"Online Shopping"|"N"|""|"890123"|""|""|"Amex"|"EditedFile_20240304.DAT"|"Alice Green"|"3456****7890"|"3"
"Jessica"|"E."|"Davis"|"Refund"|"75.00"|"2024-03-07"|"CAD"|"ACC-321"|"Bank Transfer"|""|"REF-8765"|"CUST-005"|"Refund Processed"|"N"|""|"901234"|""|""|"MasterCard"|"EditedFile_20240304.DAT"|"Mark Taylor"|"5678****1234"|"4"
```

As we can see I modified the first row by changing all of its field values.

**TO BE CONTINUED**

NEED TO ADD A FUNCTION TO ADD AND DELETE A RECORD.

### Modified DAT File (After Editing & Download)

```
"First_Name"|"Middle_Name"|"Last_Name"|"Transaction_Type"|"Transaction_Amount"|"Transaction_Date"|"Currency"|"Bank_Account"|"Payment_Method"|"Check_Number"|"Bank_Reference"|"Customer_Reference"|"Details"|"Indicator"|"Account_Info"|"Receipt_ID"|"Source_Account"|"Surcharge"|"Card_Type"|"File_Name"|"Account_Holder"|"Masked_Card"|"Sequence_No"
"Michael"|"B."|"Smith"|"Refund"|"200.00"|"2024-03-04"|"EUR"|"ACC-456"|"Wire Transfer"|""|"REF-1234"|"CUST-002"|"Refund for service"|"N"|""|"678901"|""|""|"Visa"|"EditedFile_20240304.DAT"|"John Doe"|"1234****5678"|"2"
"Emily"|"C."|"Johnson"|"Purchase"|"320.00"|"2024-03-05"|"USD"|"ACC-789"|"EFT"|""|"REF-5678"|"CUST-003"|"Subscription Payment"|"N"|""|"789012"|""|""|"Visa"|"EditedFile_20240304.DAT"|"Sarah Lee"|"9012****3456"|"2"
"David"|"D."|"Brown"|"Purchase"|"500.00"|"2024-03-06"|"GBP"|"ACC-654"|"Credit Card"|""|"REF-4321"|"CUST-004"|"Online Shopping"|"N"|""|"890123"|""|""|"Amex"|"EditedFile_20240304.DAT"|"Alice Green"|"3456****7890"|"3"
"Jessica"|"E."|"Davis"|"Refund"|"75.00"|"2024-03-07"|"CAD"|"ACC-321"|"Bank Transfer"|""|"REF-8765"|"CUST-005"|"Refund Processed"|"N"|""|"901234"|""|""|"MasterCard"|"EditedFile_20240304.DAT"|"Mark Taylor"|"5678****1234"|"4"
```

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

# Rapid Mail Server

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/nKmLng?referralCode=rqOHQs)

This project is an email queue server that processes and sends emails using Bun, Redis, PostgreSQL, and MailHog for email testing. The server is designed to handle a high volume of emails efficiently and includes caching to optimize performance.

## Features

- Queue-based email sending with Redis
- Support for plain text and HTML email content
- Caching with Redis to improve performance
- Load testing with k6
- Integration with MailHog for email testing
- Swagger UI for API documentation

## Prerequisites

- Bun
- PostgreSQL
- Redis
- MailHog

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/andynur/rapid-mail.git
cd rapid-mail
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```plaintext
DATABASE_URL="postgresql://postgres:yourpassword@yourdbhost:5432/postgres?schema=public"
REDIS_URL=redis://yourredishost:6379
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_USER=
SMTP_PASS=
```

### 4. Run Migrations

Ensure your database schema is up-to-date:

```bash
bun run generate
bun run migrate
```

### 5. Start MailHog

Start MailHog using Docker:

```bash
docker run -d -p 1025:1025 -p 8025:8025 mailhog/mailhog
```

You can access the MailHog web interface at [http://localhost:8025](http://localhost:8025).

### 6. Start the Server

```bash
bun run dev
```

### 7. Start the Queue Processor

```bash
bun run queue
```

## Testing

### API Endpoints

Use the `test-endpoints.http` file to test the API endpoints. You can use tools like VSCode's REST Client extension to send requests.

### Sample Requests

#### Add an Email to the Queue

```http
POST http://localhost:3000/emails
Content-Type: application/json

{
  "sender": "sender@example.com",
  "recipient": "recipient@example.com",
  "subject": "Test Email",
  "text": "This is a test email."
}
```

#### Retrieve All Emails

```http
GET http://localhost:3000/emails
```

### Load Testing

Use the `load-test.ts` script to perform load testing with k6.

#### Run the Load Test

```bash
k6 run dist/load-test.js
```

#### Load Test Result
![K6 Test Result](./assets/k6-preview.png)

#### Mailhog Preview
![Mailhog Preview](./assets/mailhog-preview.png)

## Swagger UI

Swagger UI is integrated into the project to provide interactive API documentation. You can access the Swagger UI at:

```
http://localhost:3000/swagger
```

### Swagger UI Preview

![Swagger UI Preview](./assets/swagger-ui.png)



## Deployment

Deploy the application to Railway:

1. **Push your code to the Railway repository** or link it to your GitHub repository.
2. **Set environment variables** in the Railway dashboard.
3. **Run migrations** to ensure the database schema is up-to-date.

## Monitoring

Use Railway's monitoring tools to monitor and debug the application.

## License

This project is licensed under the MIT License.
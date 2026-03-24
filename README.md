# MF-Host-Shell

Host Shell application for MicroFrontends Angular 21 architecture.

## Features

- Host application for microfrontends
- Navigation between admin and dashboard modules
- Module Federation integration
- Angular 21 with standalone components

## Development

```bash
npm install
npm start
```

Access: http://localhost:4200

## Architecture

This is the main shell that loads remote microfrontends:
- Admin MFE: http://localhost:4201
- Dashboard MFE: http://localhost:4202

## Technologies

- Angular 21
- Module Federation
- PrimeNG UI
- Vitest for testing
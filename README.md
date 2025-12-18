# Todo Demo – Vetra Academy Reference Implementation

This repository serves as the **official reference implementation** for the [Vetra Academy "Get Started" tutorial](https://academy.vetra.io/academy/GetStarted/CreateNewPowerhouseProject). It demonstrates a complete Powerhouse project featuring a **To-do List** document model with editors, providing learners with working code to reference as they build their own projects.

> **Maintained by the Powerhouse team** – This repository is kept up to date with the latest Powerhouse tooling and best practices.

## Purpose

When following the Vetra Academy tutorials, you'll create your own Powerhouse project from scratch. This repository provides:

- ✅ A complete, working implementation to reference
- ✅ Step-by-step tutorial branches to compare your progress
- ✅ Best practices for document models, reducers, and editors

## Using This Repository with the Tutorial

### Setup: Connect to This Repository as a Reference

While following the tutorial, add this repository as a remote to access reference branches:

```bash
# In your own project directory
git remote add tutorial https://github.com/powerhouse-inc/todo-tutorial.git
git fetch tutorial --prune
```

### Compare Your Work with Reference Steps

At any point, compare what you've built with a tutorial step:

```bash
# Compare your current work with a specific step
git diff tutorial/step-1-initialize-with-ph-init

# See what changed between tutorial steps
git diff tutorial/step-1-initialize-with-ph-init..tutorial/step-2-generate-todo-list-document-model

# Compare specific files
git diff tutorial/step-1-initialize-with-ph-init -- package.json
```

### If You Get Stuck

Reset your code to match a tutorial step:

```bash
# Reset to a specific step (WARNING: loses your changes)
git reset --hard tutorial/step-2-generate-todo-list-document-model
```

## Project Structure

```
todo-demo/
├── document-models/          # Document model definitions
│   └── todo-list/            # TodoList document model
│       ├── gen/              # Auto-generated code
│       ├── src/              # Custom reducer implementations
│       │   ├── reducers/     # State transition logic
│       │   └── tests/        # Unit tests
│       └── schema.graphql    # GraphQL schema definition
├── editors/                  # Document editors
│   ├── todo-list-editor/     # Main TodoList editor
│   └── todo-drive-explorer/  # Drive explorer component
├── subgraphs/                # GraphQL subgraphs
├── processors/               # Data processors
└── powerhouse.manifest.json  # Package manifest
```

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run generate` | Updates generated code from document model specifications |
| `npm run connect` | Launch Connect app locally for testing |
| `npm run vetra` | Launch Vetra Studio for document model development |
| `npm run build` | Build the library project |
| `npm run test` | Run unit tests |
| `npm run lint` | Check for linting errors |

## Tutorial Steps

The Vetra Academy tutorial covers:

1. **Initialize Project** – Set up a new Powerhouse project with `ph init`
2. **Write Document Specification** – Define your document model schema in Vetra Studio
3. **Generate Document Model** – Scaffold code from your specification
4. **Implement Reducers** – Write state transition logic for operations
5. **Write Tests** – Ensure your reducers work correctly
6. **Build Editor** – Create a user interface for your document model

## Learn More

- 📚 [Vetra Academy – Get Started Tutorial](https://academy.vetra.io/academy/GetStarted/CreateNewPowerhouseProject)
- 🔧 [Vetra Studio Documentation](https://academy.vetra.io/)
- 💬 [Powerhouse Discord Community](https://discord.gg/powerhouse)

## License

AGPL-3.0-only

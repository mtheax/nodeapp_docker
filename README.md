# nodeapp

Node.js (Express) застосунок із PostgreSQL, запакований у Docker. CI/CD через GitHub Actions, деплой на AWS EC2 через docker compose.

## Файли
- `Dockerfile` — образ на базі `node:lts`
- `.dockerignore` — виключає `node_modules`, `.env` тощо
- `docker-compose.yml` — сервіси `app` і `db` (postgres:15)
- `.github/workflows/deploy.yml` — збірка, пуш у Docker Hub, деплой на EC2
- `index.js` — застосунок, підключення до Postgres

## Локальна збірка
```bash
docker build -t <your-name>/nodeapp:$(git rev-parse --short HEAD) .
```

## Локальний запуск (app + db)
```bash
IMAGE_TAG=local DOCKERHUB_USERNAME=<your-name> POSTGRES_PASSWORD=secret docker compose up --build
docker compose logs app
curl localhost:3000
```
У логах має з'явитися `Connected to PostgreSQL`.

## GitHub Secrets
| Secret | Опис |
|---|---|
| `DOCKERHUB_USERNAME` | логін Docker Hub |
| `DOCKERHUB_TOKEN` | Personal Access Token Docker Hub |
| `EC2_HOST` | публічна IP/DNS EC2 |
| `EC2_USER` | користувач SSH (напр. `ubuntu`) |
| `EC2_SSH_KEY` | приватний SSH-ключ |
| `POSTGRES_PASSWORD` | пароль БД |

## Підготовка EC2 (один раз, Ubuntu)
Видалення pm2:
```bash
pm2 kill
pm2 unstartup systemd || true
sudo npm uninstall -g pm2
rm -rf ~/.pm2
```
Встановлення Docker:
```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" | sudo tee /etc/apt/sources.list.d/docker.list
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker $USER
```
Security Group: відкрити порти 22 і 3000.

ifneq (,$(wildcard ./.env))
    include .env
    export
endif

test:
	NODE_ENV=test npx jest

test-watch:
	NODE_ENV=test npx jest --watch

lint:
	npx eslint .

checks: lint test

infra-up:
	docker-compose up

infra-down:
	docker-compose down

migrate:
	npx sequelize-cli db:migrate

db-console:
	PGPASSWORD=${POSTGRES_PASSWORD} psql --host=${POSTGRES_HOST} --username=${POSTGRES_USER} --dbname=${POSTGRES_DB}_${NODE_ENV}

filename = ${POSTGRES_DB}_${NODE_ENV}_$(shell date --iso=minutes).gz

db-dump:
	PGPASSWORD=${POSTGRES_PASSWORD} pg_dump -U ${POSTGRES_USER} -h ${POSTGRES_HOST} ${POSTGRES_DB}_${NODE_ENV} | gzip -c > ./db/postgresql/backups/${filename}

.PHONY: nvm &> /dev/null && nvm use

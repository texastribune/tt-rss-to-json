APP := rsstojson

docker/build:
	@echo "Building app..."
	@docker build \
		--tag ${APP} \
		.

install:
ifeq (, $(wildcard ./.env))
	@echo Setting up the environment file
	@cp ./templates/template_env .env
	
	
	@read -p "Enter DISCORD_TOKEN: " token; \
	sed -i 's|<DISCORD_TOKEN>|'$$token'|g' .env

	@read -p "Enter DISCORD_CLIENTID: " token; \
	sed -i 's|<DISCORD_CLIENTID>|'$$token'|g' .env

	@read -p "Enter DISCORD_CLIENTSECRET: " token; \
	sed -i 's|<DISCORD_CLIENTSECRET>|'$$token'|g' .env

	@read -p "Enter TWITCH_USERNAME: " token; \
	sed -i 's|<TWITCH_USERNAME>|'$$token'|g' .env

	@read -p "Enter TWITCH_TOKEN: " token; \
	sed -i 's|<TWITCH_TOKEN>|'$$token'|g' .env

	@read -p "Enter TWITCH_CLIENTID: " token; \
	sed -i 's|<TWITCH_CLIENTID>|'$$token'|g' .env

	@read -p "Enter TWITCH_CLIENTSECRET: " token; \
	sed -i 's|<TWITCH_CLIENTSECRET>|'$$token'|g' .env
	
	@echo Done.
else
	@echo Found existing .env file, skipping this step.
endif

	@echo Installing packages...
	@npm i
	@echo Done.
	
	@echo Setting up the systemd service...
	@sed -i 's|WORKINGDIRECTORY|'$(PWD)'|g' Spiritey2.service
	@sed -i 's|USER|'$(USER)'|g' Spiritey2.service
	@sudo cp ./Spiritey2.service /etc/systemd/system
	@sudo systemctl daemon-reload
	@echo Done.
	
	@echo Starting bot...
	@sudo service Spiritey2 start
	@echo Done.

uninstall:
	@echo Stopping bot...
	@sudo service Spiritey2 stop
	@echo Done.

	@echo Removing systemd service...
	@sed -i 's|'$(PWD)'|WORKINGDIRECTORY|g' Spiritey2.service
	@sed -i 's|'$(USER)'|USER|g' Spiritey2.service
	@sudo rm /etc/systemd/system/Spiritey2.service
	@sudo systemctl daemon-reload
	@echo Done.
	
	@echo Deleting node_modules/
	@sudo rm node_modules -r
	@echo Done
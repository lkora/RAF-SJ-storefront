#!/bin/bash
node_modules/sequelize-cli/lib/sequelize db:migrate:undo:all
node_modules/sequelize-cli/lib/sequelize db:migrate
node_modules/sequelize-cli/lib/sequelize db:seed:all

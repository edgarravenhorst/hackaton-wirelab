#!/bin/bash
cd app
zip -r -X ../bundle.zip * --exclude=*node_modules*

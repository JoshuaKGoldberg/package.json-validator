#!/bin/bash

# Files are hosted on package-json-validator.com using S3
s3cmd put --acl-public --exclude '.git/*' --recursive ./ s3://package-json-validator.com

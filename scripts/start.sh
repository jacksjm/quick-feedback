#!/usr/bin/env bash

yarn workspace quick-feedback-client run build
yarn workspace quick-feedback-server run dev:up
yarn workspace quick-feedback-server run dev

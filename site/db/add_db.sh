#!/bin/sh
set -v
sudo -u postgres psql -c "CREATE USER cuhackit WITH PASSWORD 'password'";
sudo -u postgres psql -c "CREATE DATABASE cuhackit OWNER cuhackit;"
psql postgresql://cratesfyi:password@localhost < schema.sql

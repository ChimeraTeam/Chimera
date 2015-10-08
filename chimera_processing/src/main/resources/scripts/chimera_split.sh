#!/bin/bash
rm -rf /tmp/chimera/
mkdir /tmp/chimera
split -l$1 $2 $3

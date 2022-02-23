LDFLAGS += -s -w \
	-X main.ApplicationName=$(BIN) \
	-X main.BuildVersion=$(shell git rev-list -1 HEAD)

BIN ?= battlemap.exe
GO ?= go
GOTAGS += netgo

# Some makefile trickery to make a space seperated list to a comma seperated one
null  :=
space := $(null) #
comma := ,

.PHONY: all build clean debug
all: build

build:
	$(GO) build -o $(BIN) -tags $(subst $(space),$(comma),$(strip $(GOTAGS))) -v -ldflags="$(LDFLAGS)"


debug: GOTAGS += debug
debug: build

clean:
	@rm -f $(BIN)

#include <pebble.h>

static Window *window;
static TextLayer *latitude_layer;
static TextLayer *longitude_layer;
static TextLayer *nearby_layer;

// Handle messages
void in_received_handler(DictionaryIterator *received, void *context) {
	APP_LOG(APP_LOG_LEVEL_DEBUG, "Got message from Javascript");

	Tuple *latitude_tuple = dict_find(received, 1);
	if ( latitude_tuple ) {
		APP_LOG(APP_LOG_LEVEL_DEBUG, "1");
		text_layer_set_text( latitude_layer, latitude_tuple->value->cstring);
	}

	Tuple *longitude_tuple = dict_find(received, 2);
	if ( longitude_tuple ) {
		APP_LOG(APP_LOG_LEVEL_DEBUG, "2");
		text_layer_set_text( longitude_layer, longitude_tuple->value->cstring);
	}
	
	Tuple *nearby_tuple = dict_find(received, 3);
	if ( nearby_tuple ) {
		APP_LOG(APP_LOG_LEVEL_DEBUG, "3");
		text_layer_set_text( nearby_layer, nearby_tuple->value->cstring);
	}
}

// Set everything up
static void window_load(Window *window) {
  Layer *window_layer = window_get_root_layer(window);
  GRect bounds = layer_get_bounds(window_layer);

  latitude_layer = text_layer_create((GRect) { .origin = { 0, 30 }, .size = { bounds.size.w, 20 } });
  text_layer_set_text(latitude_layer, "Latitude");
  text_layer_set_text_alignment(latitude_layer, GTextAlignmentCenter);
  layer_add_child(window_layer, text_layer_get_layer(latitude_layer));

  longitude_layer = text_layer_create((GRect) { .origin = { 0, 50 }, .size = { bounds.size.w, 20 } });
  text_layer_set_text(longitude_layer, "Longitude");
  text_layer_set_text_alignment(longitude_layer, GTextAlignmentCenter);
  layer_add_child(window_layer, text_layer_get_layer(longitude_layer));

  nearby_layer = text_layer_create((GRect) { .origin = { 0, 90 }, .size = { bounds.size.w, 20 } });
  text_layer_set_text(nearby_layer, "Nearby");
  text_layer_set_text_alignment(nearby_layer, GTextAlignmentCenter);
  layer_add_child(window_layer, text_layer_get_layer(nearby_layer));
}

static void window_unload(Window *window) {
  text_layer_destroy(latitude_layer);
  text_layer_destroy(longitude_layer);
  text_layer_destroy(nearby_layer);
}

static void setupMessaging(void) {
	app_message_register_inbox_received(in_received_handler);
	const uint32_t inbound_size = 128;
	const uint32_t outbound_size = 128;
	app_message_open(inbound_size, outbound_size);
}

static void init(void) {
  window = window_create();
  window_set_window_handlers(window, (WindowHandlers) {
    .load = window_load,
    .unload = window_unload,
  });
  const bool animated = true;
  window_stack_push(window, animated);
setupMessaging();
}

// Tear everything down
static void deinit(void) {
  window_destroy(window);
}

// Main

int main(void) {
  init();

  APP_LOG(APP_LOG_LEVEL_DEBUG, "Done initializing, pushed window: %p", window);

  app_event_loop();
  deinit();
}

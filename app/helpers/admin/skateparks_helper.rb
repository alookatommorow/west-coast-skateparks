module Admin
  module SkateparksHelper
    ATTRIBUTE_TYPES = {
      address: "string",
      city: "string",
      state: "string",
      zip_code: "string",
      latitude: "number",
      longitude: "number",
    }.freeze

    def nested_attribute_field_for(attribute, form)
      attribute_symbol = attribute.parameterize.underscore.to_sym
      content_tag(:div, class: ["field-unit", "field-unit--#{ATTRIBUTE_TYPES[attribute_symbol]}"]) do
        label = content_tag(:label, attribute, for: "skatepark_location_attributes_#{attribute_symbol}")
        field = form.text_field(attribute_symbol)

        content_tag(:div, label, class: "field-unit__label") +
          content_tag(:div, field, class: "field-unit__field")
      end
    end
  end
end

module Attributes
  def attributes(*attrs)
    module_exec do
      define_method(:attributes) { attrs }
    end
  end
end

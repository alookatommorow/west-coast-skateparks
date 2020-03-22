# Use these to color and format strings when outputting to STDOUT
# For more: https://stackoverflow.com/questions/1489183/colorized-ruby-output
def bold(s);  "\e[1m#{s}\e[22m" end
def red(s);   "\e[31m#{s}\e[0m" end
def green(s); "\e[32m#{s}\e[0m" end

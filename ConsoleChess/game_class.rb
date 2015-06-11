require_relative 'piece_class.rb'
require_relative 'board_class.rb'

class Game

  def initialize#(white_player, black_player)
  #   @white = white_player
  #   @black = black_player
    @board = Board.new
  end

  def play


    until @board.check_mate?(:white) || @board.check_mate?(:black)
      @board.display

      start_pos, end_pos = get_input

      start_pos = parse_input(start_pos)

      end_pos = parse_input(end_pos)

      @board.move(start_pos, end_pos)
    end
    @board.display
    puts "Checkmate!"

  end

  def get_input
    puts "Which piece would you like to move?"
    piece = gets.chomp

    puts "Where would you like to move it?"
    destination = gets.chomp

    input = [piece.downcase, destination.downcase]

  end

  def handle_input

  end

  def parse_input(input)
    input_arr = input.split("")
    x_coord = input_arr[0].ord - 97
    y_coord = (input_arr[1].to_i - 8).abs

    [y_coord, x_coord]

  end

end
